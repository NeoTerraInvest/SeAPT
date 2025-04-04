import { useCallback, useEffect, useRef, useState } from 'react';
import {
  createChart,
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
  const [priceData, setPriceData] = useState<LineData[]>([]);
  const [lastTimestamp, setLastTimestamp] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const poolAddress =
    '0x11950d141ecb863f01007add7d1a342041227b58'.toLowerCase();

  // ✅ useCallback으로 감싸기
  const fetchSwaps = useCallback(async () => {
    setLoading(true);

    const query = `
      {
        swaps(
          first: 500,
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

      const merged = [...priceData, ...newData]
        .filter(
          (item, idx, arr) => idx === 0 || item.time !== arr[idx - 1].time,
        )
        .sort((a, b) => Number(a.time) - Number(b.time));

      setPriceData(merged);
      setLastTimestamp(Number(swaps[swaps.length - 1].timestamp));
    } catch (err) {
      console.error('❌ fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [lastTimestamp, priceData, poolAddress]);

  useEffect(() => {
    fetchSwaps(); // ✅ useCallback이므로 안전
  }, [fetchSwaps]);

  useEffect(() => {
    if (chartContainerRef.current && priceData.length > 0) {
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

      const lineSeries = chart.addSeries(LineSeries, {
        color: '#00b894',
        lineWidth: 2,
      });

      lineSeries.setData(priceData);

      return () => chart.remove();
    }
  }, [priceData]);

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
