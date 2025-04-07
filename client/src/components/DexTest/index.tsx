import { useCallback, useEffect, useRef, useState } from 'react';
import {
  createChart,
  IChartApi,
  LineData,
  LineSeries,
  UTCTimestamp,
} from 'lightweight-charts';

type Swap = {
  timestamp: string;
  amountUSD: string;
};

const DEXChart = () => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ReturnType<IChartApi['addSeries']> | null>(null);
  const [priceData, setPriceData] = useState<LineData[]>([]);
  const [lastTimestamp, setLastTimestamp] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  const poolAddress =
    '0x11950d141ecb863f01007add7d1a342041227b58'.toLowerCase();

  // 데이터 가져오기
  const fetchSwaps = useCallback(async () => {
    if (loading) return;
    setLoading(true);

    const query = `
      {
        swaps(
          first: 1000,
          orderBy: timestamp,
          orderDirection: asc,
          where: {
            pool: "${poolAddress}",
            timestamp_gt: ${lastTimestamp}
          }
        ) {
          timestamp
          amountUSD
        }
      }
    `;

    try {
      const response = await fetch('http://localhost:4000/api/uniswap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const json = await response.json();
      const swaps: Swap[] = json.data?.swaps ?? [];

      if (swaps.length === 0) {
        setHasMore(false);
        return;
      }

      const grouped: Record<number, number> = {};
      swaps.forEach((swap) => {
        const ts = Number(swap.timestamp);
        const hour = Math.floor(ts / 3600) * 3600;
        const amount = Number(swap.amountUSD);
        grouped[hour] = (grouped[hour] || 0) + amount;
      });

      const newData: LineData[] = Object.entries(grouped)
        .map(([time, value]) => ({
          time: Number(time) as UTCTimestamp,
          value,
        }))
        .sort((a, b) => a.time - b.time);

      // 데이터 병합 및 중복 제거
      const merged = [...priceData, ...newData]
        .filter(
          (item, idx, arr) => idx === 0 || item.time !== arr[idx - 1].time,
        )
        .sort((a, b) => Number(a.time) - Number(b.time));

      setPriceData(merged);

      if (swaps.length > 0) {
        setLastTimestamp(Number(swaps[swaps.length - 1].timestamp));
      }

      // 초기 로드 완료 표시
      if (initialLoad) {
        setInitialLoad(false);
      }
    } catch (err) {
      console.error('❌ fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [lastTimestamp, priceData, poolAddress, loading, initialLoad]);

  // 차트 초기화 - 단 한 번만 실행
  useEffect(() => {
    // 차트가 이미 존재하면 초기화하지 않음
    if (chartRef.current || !chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: 700,
      height: 400,
      layout: {
        background: { color: '#1e1e1e' },
        textColor: '#ccc',
      },
      grid: {
        vertLines: { color: '#2B2B43' },
        horzLines: { color: '#363C4E' },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        tickMarkFormatter: (time: number) => {
          const date = new Date(time * 1000);
          return `${date.getUTCFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
        },
      },
    });

    // 5.0.5 버전에 맞게 addSeries 사용
    const lineSeries = chart.addSeries(LineSeries, {
      color: '#00b894',
      lineWidth: 2,
    });

    // 참조 저장
    chartRef.current = chart;
    seriesRef.current = lineSeries;

    // 컴포넌트 언마운트시 차트 정리
    return () => {
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
        seriesRef.current = null;
      }
    };
  }, []);

  // 초기 데이터 로드
  useEffect(() => {
    if (initialLoad) {
      fetchSwaps();
    }
  }, [fetchSwaps, initialLoad]);

  // 데이터가 업데이트될 때 차트 업데이트
  useEffect(() => {
    if (seriesRef.current && priceData.length > 0) {
      seriesRef.current.setData(priceData);

      // 차트 영역 자동 조정
      if (chartRef.current) {
        chartRef.current.timeScale().fitContent();
      }
    }
  }, [priceData]);

  // 자동으로 더 많은 데이터 로드 (초기 데이터가 적을 경우)
  useEffect(() => {
    if (!initialLoad && priceData.length < 100 && hasMore && !loading) {
      fetchSwaps();
    }
  }, [initialLoad, priceData.length, hasMore, loading, fetchSwaps]);

  return (
    <div className='dex-chart-wrapper'>
      <h2>
        📊 DEX Chart - Pool: {poolAddress.slice(0, 6)}...{poolAddress.slice(-4)}
      </h2>

      <div ref={chartContainerRef} className='chart-container' />

      <div style={{ marginTop: '16px', textAlign: 'center' }}>
        {loading && <p>⏳ 불러오는 중...</p>}
        {!loading && hasMore && (
          <button onClick={fetchSwaps}>🔁 더 불러오기</button>
        )}
        {!loading && !hasMore && <p>✅ 모든 데이터 불러옴</p>}
      </div>
    </div>
  );
};

export default DEXChart;
