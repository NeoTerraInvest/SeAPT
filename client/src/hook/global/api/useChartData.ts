import { useCallback, useEffect, useRef, useState } from 'react';
import * as LightweightCharts from 'lightweight-charts';
import getApi from '@/service/get.api';
import { ISeriesApi } from 'lightweight-charts';
import socketManager from '@/utils/ChartSocketManager';

interface Candle {
  start_time: string;
  end_time: string;
  open: string;
  high: string;
  low: string;
  close: string;
  base_volume: string;
}

interface ChartData {
  lastPrice: number;
  currentTime: number;
  currentMinute: number;
  formattedPrice: string;
}

interface CandleResponse {
  data: Candle[];
}

const useChartData = (
  marketId: string,
  isActive: boolean,
  onPriceUpdate?: (data: ChartData) => void,
) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const chartRef = useRef<LightweightCharts.IChartApi | null>(null);
  const currentCandleRef = useRef<LightweightCharts.CandlestickData | null>(
    null,
  );
  const currentMinuteRef = useRef<number | null>(null);
  //추가 필요
  const [isMounted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const fetchInitialData = useCallback(async () => {
    if (!chartContainerRef.current || !chartRef.current) return;
    setIsLoading(true);
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
          chartRef.current.timeScale().setVisibleLogicalRange({
            from: totalBars - visibleBars,
            to: totalBars,
          });
        } else {
          chartRef.current.timeScale().fitContent(); // 너무 적은 데이터면 전체 보여주기
        }

        const lastBar = bars[bars.length - 1];
        currentMinuteRef.current = Math.floor(Number(lastBar.time) / 60);
        currentCandleRef.current = lastBar;
      }
    } catch (error) {
      console.error('📉 Failed to fetch candle data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [marketId, isMounted]);

  // chart 생성 및 초기화
  useEffect(() => {
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
    const priceDecimalPrecision = 10;
    const candleSeries = chart.addSeries(LightweightCharts.CandlestickSeries, {
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
      priceFormat: {
        type: 'price',
        //동적으로 변환이 가능하게 코드를 수정 필요
        precision: priceDecimalPrecision,
        minMove: Math.pow(10, -priceDecimalPrecision),
      },
    });

    seriesRef.current = candleSeries;

    fetchInitialData();

    return () => {
      chart.remove();
    };
  }, [fetchInitialData]);

  useEffect(() => {
    if (isActive) {
      socketManager.subscribe(marketId, (data: ChartData) => {
        if (onPriceUpdate) {
          onPriceUpdate(data);
        }

        if (currentMinuteRef.current !== data.currentMinute) {
          currentMinuteRef.current = data.currentMinute;
          currentCandleRef.current = {
            time: data.currentTime as LightweightCharts.UTCTimestamp,
            open: data.lastPrice,
            high: data.lastPrice,
            low: data.lastPrice,
            close: data.lastPrice,
          };
        } else {
          const candle = currentCandleRef.current;
          if (candle) {
            candle.high = Math.max(candle.high, data.lastPrice);
            candle.low = Math.min(candle.low, data.lastPrice);
            candle.close = data.lastPrice;
          }
        }
      });
      return () => {
        socketManager.unsubscribe(marketId);
      };
    }
  }, [isActive, marketId, onPriceUpdate]);

  return {
    chartContainerRef,
    isLoading,
  };
};

export default useChartData;
