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
};

const DexChart = () => {
  const { pairId } = useParams<{ pairId: string }>();
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const [priceData, setPriceData] = useState<LineData[]>([]);
  const [interval, setInterval] = useState<'1m' | '1h' | '1d'>('1h');

  useEffect(() => {
    if (!pairId) return;

    const getRoundedTimestamp = (timestamp: number, type: typeof interval) => {
      const date = new Date(timestamp * 1000);
      if (type === '1m') {
        return Math.floor(date.getTime() / 60000) * 60;
      }
      if (type === '1h') {
        return Math.floor(date.getTime() / 3600000) * 60 * 60;
      }
      if (type === '1d') {
        return Math.floor(date.getTime() / 86400000) * 24 * 60 * 60;
      }
      return timestamp;
    };

    const fetchPriceData = async () => {
      const query = `
        {
          swaps(
            first: 200
            orderBy: timestamp
            orderDirection: asc
            where: { pair: "${pairId}" }
          ) {
            amountUSD
            timestamp
          }
        }
      `;

      const response = await fetch('http://localhost:4000/api/uniswap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const json = await response.json();
      const rawSwaps: Swap[] = json.data?.swaps ?? [];

      const grouped: Record<number, { total: number; count: number }> = {};

      rawSwaps.forEach((swap) => {
        const t = getRoundedTimestamp(Number(swap.timestamp), interval);
        const value = Number(swap.amountUSD);
        if (!grouped[t]) grouped[t] = { total: value, count: 1 };
        else {
          grouped[t].total += value;
          grouped[t].count += 1;
        }
      });

      const averaged: LineData[] = Object.entries(grouped)
        .map(([time, { total, count }]) => {
          const avg = total / count;
          return {
            time: Number(time) as UTCTimestamp,
            value: avg,
          };
        })
        .filter((item) => item.value < 9e15); // lightweight limit

      const sorted = averaged.sort((a, b) => Number(a.time) - Number(b.time));
      setPriceData(sorted);
    };

    fetchPriceData();
  }, [pairId, interval]);

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
            const year = date.getUTCFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            return `${year}/${month}/${day}`; // 예: 4/11
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
      <h2>DEX Chart - {pairId}</h2>

      <div style={{ marginBottom: '10px' }}>
        <label htmlFor='interval'>⏱️ 시간 단위: </label>
        <select
          id='interval'
          value={interval}
          onChange={(e) => setInterval(e.target.value as '1m' | '1h' | '1d')}
        >
          <option value='1m'>1분</option>
          <option value='1h'>1시간</option>
          <option value='1d'>1일</option>
        </select>
      </div>

      <div ref={chartContainerRef} className='chart-container' />
    </div>
  );
};

export default DexChart;
