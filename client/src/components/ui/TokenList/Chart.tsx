import { useEffect, useRef, useState } from 'react';
import * as LightweightCharts from 'lightweight-charts';
import { ISeriesApi } from 'lightweight-charts';
import getApi from '@/service/get.api';
import formatNumber from '@/utils/formatNumber';

interface Candle {
  start_time: string;
  end_time: string;
  open: string;
  high: string;
  low: string;
  close: string;
  base_volume: string;
}

interface CandleResponse {
  data: Candle[];
}

const Chart = ({ marketId = 'F3-USDT' }: { marketId: string }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const chartRef = useRef<LightweightCharts.IChartApi | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const [isCurrentPrice, setCurrentPrice] = useState<string>('');
  const unit = marketId.split('-')[1];
  const name = marketId.split('-')[0];
  // 실시간 캔들 누적용 ref
  const currentCandleRef = useRef<LightweightCharts.CandlestickData | null>(
    null,
  );
  const currentMinuteRef = useRef<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    if (!chartContainerRef.current) return;

    const chart = LightweightCharts.createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth || 800,
      height: 500,
      layout: {
        background: { color: '#000' },
        textColor: '#ccc',
      },
      grid: {
        vertLines: { color: '#333' },
        horzLines: { color: '#333' },
      },
      crosshair: {
        mode: LightweightCharts.CrosshairMode.Normal,
      },
      timeScale: {
        timeVisible: true,
        tickMarkFormatter: (time: number) => {
          const d = new Date(time * 1000);
          return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
        },
      },
    });

    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0] && chartRef.current) {
        const width = entries[0].contentRect.width;
        chartRef.current.applyOptions({ width });
      }
    });

    if (chartContainerRef.current) {
      resizeObserver.observe(chartContainerRef.current);
    }

    chartRef.current = chart;
    const priceDecimalPrecision = 5;
    const candleSeries = chart.addSeries(LightweightCharts.CandlestickSeries, {
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
      priceFormat: {
        type: 'price',
        precision: priceDecimalPrecision,
        minMove: Math.pow(10, -priceDecimalPrecision),
      },
    });

    seriesRef.current = candleSeries;

    const fetchInitialData = async () => {
      try {
        const now = new Date();
        const end = now.toISOString();
        // const from = new Date(now.getTime() - 1000 * 60 * 60 * 6).toISOString(); // 최근 6시간
        // y 값의 기준의 가격 대가 해당 id에 따라 달라지게 구현을 해야한다.
        const url = `/candle?market_ids=${marketId}&interval=1m&start_time=2022-12-01T01:01:01.001Z&end_time=${end}&sort=asc&limit=3000`;
        const json = await getApi<CandleResponse>(url);
        const data = json.data || [];

        // console.log('📦 API 응답 데이터:', data);
        // console.log('📦 시간:', end);

        const bars: LightweightCharts.CandlestickData[] = data
          .filter((c) => !!c.start_time && !isNaN(Date.parse(c.start_time)))
          .map((candle) => ({
            time: Math.floor(
              new Date(candle.start_time).getTime() / 1000,
            ) as LightweightCharts.UTCTimestamp,
            open: parseFloat(candle.open),
            high: parseFloat(candle.high),
            low: parseFloat(candle.low),
            close: parseFloat(candle.close),
          }))
          .sort((a, b) => a.time - b.time);

        if (bars.length === 0) {
          console.warn('⚠️ 변환된 bars가 비어있습니다.');
          return;
        }

        if (seriesRef.current && isMounted) {
          seriesRef.current.setData(bars);

          // 👉 마지막 봉을 기준으로 최근 100개 캔들만 보이게 확대
          const visibleBars = 100;
          const totalBars = bars.length;

          if (totalBars >= visibleBars) {
            chart.timeScale().setVisibleLogicalRange({
              from: totalBars - visibleBars,
              to: totalBars,
            });
          } else {
            chart.timeScale().fitContent(); // 너무 적은 데이터면 전체 보여주기
          }

          const lastBar = bars[bars.length - 1];
          currentMinuteRef.current = Math.floor(Number(lastBar.time) / 60);
          currentCandleRef.current = lastBar;
        }
      } catch (error) {
        console.error('📉 Failed to fetch candle data:', error);
      }
    };

    fetchInitialData();

    const ws = new WebSocket('wss://api.probit.com/api/exchange/v1/ws');
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: 'subscribe',
          channel: 'marketdata',
          filter: ['ticker'],
          interval: 100,
          market_id: marketId,
        }),
      );
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.channel === 'marketdata' && data.ticker) {
        const lastPrice = parseFloat(data.ticker.last);
        const currentTime = Math.floor(Date.now() / 1000);
        const currentMinute = Math.floor(currentTime / 60);

        setCurrentPrice(formatNumber(data.ticker.last, 5));

        if (currentMinuteRef.current !== currentMinute) {
          currentMinuteRef.current = currentMinute;
          currentCandleRef.current = {
            time: currentTime as LightweightCharts.UTCTimestamp,
            open: lastPrice,
            high: lastPrice,
            low: lastPrice,
            close: lastPrice,
          };
        } else {
          const candle = currentCandleRef.current;
          if (candle) {
            candle.high = Math.max(candle.high, lastPrice);
            candle.low = Math.min(candle.low, lastPrice);
            candle.close = lastPrice;
          }
        }

        if (seriesRef.current && currentCandleRef.current) {
          seriesRef.current.update(currentCandleRef.current);
        }
      }
    };

    return () => {
      isMounted = false;
      ws.close();
      chart.remove();
      resizeObserver.disconnect();
    };
  }, [marketId, isCurrentPrice]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ width: '100%', margin: '15px 0' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {isCurrentPrice}
          </div>
          <button
            style={{
              background: 'var(--object-grey-6)',
              padding: '10px',
              maxWidth: '100px',
              width: '100%',
              borderRadius: '5px',
              color: 'var(--chart-green)',
            }}
            onClick={() => {
              window.open(
                `https://www.probit.com/en-us/app/exchange/${marketId}`,
                '_blank',
              );
            }}
          >
            Buy
          </button>
        </div>
        <div style={{ marginTop: '5px', fontSize: '12px', color: '#ccc' }}>
          {name}/{unit}
        </div>
      </div>
      <div
        ref={chartContainerRef}
        style={{ width: '100%', flex: 1, minHeight: 0 }}
      />
    </div>
  );
};

export default Chart;
