import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  createChart,
  LineData,
  LineSeries,
  UTCTimestamp,
} from 'lightweight-charts';
import '../../styles/components/DexChart/DexChart.scss';

type Swap = {
  timestamp: string;
  amountUSD: string;
  pool: {
    id: string;
  };
};

const DexChart = () => {
  const { poolId } = useParams<{ poolId: string }>();
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const [priceData, setPriceData] = useState<LineData[]>([]);
  const [loading, setLoading] = useState(true);
  const [interval, setInterval] = useState<'1m' | '1h' | '1d'>('1h');

  useEffect(() => {
    if (!poolId) return;

    const getRoundedTimestamp = (timestamp: number, unit: typeof interval) => {
      const date = new Date(timestamp * 1000);
      if (unit === '1m') return Math.floor(date.getTime() / 60000) * 60;
      if (unit === '1h') return Math.floor(date.getTime() / 3600000) * 3600;
      if (unit === '1d') return Math.floor(date.getTime() / 86400000) * 86400;
      return timestamp;
    };

    const fetchPriceData = async () => {
      setLoading(true);
      const query = `
        {
          swaps(
            first: 1000
            orderBy: timestamp
            orderDirection: desc
          ) {
            timestamp
            amountUSD
            pool {
              id
            }
          }
          _meta {
            block {
              timestamp
            }
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

        const blockTimestamp = json.data?._meta?.block?.timestamp;
        if (blockTimestamp) {
          const latest = new Date(blockTimestamp * 1000).toISOString();
          console.log('🧭 인덱싱된 마지막 블록 시간:', latest);
        }

        const allSwaps: Swap[] = json.data?.swaps ?? [];
        const filtered = allSwaps.filter(
          (swap) => swap.pool?.id?.toLowerCase() === poolId.toLowerCase(),
        );

        console.log(`📦 필터링된 swaps 수: ${filtered.length}`);

        const grouped: Record<number, number> = {};
        filtered.forEach((swap) => {
          const ts = Number(swap.timestamp);
          const rounded = getRoundedTimestamp(ts, interval);
          const amount = Number(swap.amountUSD);
          if (!grouped[rounded]) grouped[rounded] = amount;
          else grouped[rounded] += amount;
        });

        const transformed: LineData[] = Object.entries(grouped)
          .map(([time, value]) => ({
            time: Number(time) as UTCTimestamp,
            value,
          }))
          .sort((a, b) => a.time - b.time);

        setPriceData(transformed);
      } catch (err) {
        console.error('❌ Fetch 에러:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPriceData();
  }, [poolId, interval]);

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
      <h2>📊 DEX Chart - {poolId}</h2>

      <div style={{ marginBottom: '12px' }}>
        <label htmlFor='interval'>⏱️ 시간 단위: </label>
        <select
          id='interval'
          value={interval}
          style={{ color: 'black' }}
          onChange={(e) => setInterval(e.target.value as '1m' | '1h' | '1d')}
        >
          <option value='1m'>1분</option>
          <option value='1h'>1시간</option>
          <option value='1d'>1일</option>
        </select>
      </div>

      {loading ? (
        <p>⏳ 불러오는 중...</p>
      ) : (
        <div ref={chartContainerRef} className='chart-container' />
      )}
    </div>
  );
};

export default DexChart;
