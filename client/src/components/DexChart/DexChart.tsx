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
  const { pairId } = useParams();
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const [priceData, setPriceData] = useState<LineData[]>([]);

  useEffect(() => {
    if (!pairId) {
      console.warn('⚠️ pairId is Empty');
      return;
    }

    const fetchPriceData = async () => {
      console.log('🚀 pairId =', pairId);

      const query = `
        {
          swaps(
            first: 100
            orderBy: timestamp
            orderDirection: asc
            where: { pair: "${pairId}" }
          ) {
            amountUSD
            timestamp
          }
        }
      `;

      try {
        const response = await fetch('http://localhost:4000/api/uniswap', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query }),
        });

        if (!response.ok) {
          console.error(
            '❌ fetch faild:',
            response.status,
            response.statusText,
          );
          return;
        }

        const json = await response.json();
        console.log('📦 raw json =', json);

        if (json.errors) {
          console.error('❌ GraphQL Errors:', json.errors);
          return;
        }

        const rawSwaps: Swap[] = json.data?.swaps ?? [];
        console.log('🔢 swaps 개수:', rawSwaps.length);
        if (rawSwaps.length === 0) {
          console.warn('⚠️ swaps is Empty');
        }

        const result: LineData[] = rawSwaps.map(
          (swap: Swap): LineData => ({
            time: Number(swap.timestamp) as UTCTimestamp,
            value: Number(swap.amountUSD),
          }),
        );

        const grouped = result.reduce(
          (acc: Record<number, { total: number; count: number }>, curr) => {
            const t = curr.time as number;
            if (!acc[t]) {
              acc[t] = { total: curr.value, count: 1 };
            } else {
              acc[t].total += curr.value;
              acc[t].count += 1;
            }
            return acc;
          },
          {},
        );

        const averaged: LineData[] = Object.entries(grouped)
          .map(([time, { total, count }]) => {
            const avg = total / count;
            return {
              time: Number(time) as UTCTimestamp,
              value: avg,
            };
          })
          .filter((item) => {
            const inRange =
              item.value >= -90071992547409.91 &&
              item.value <= 90071992547409.91 &&
              !Number.isNaN(item.value);
            if (!inRange) {
              console.warn('⚠️ OverFlow Value:', item);
            }
            return inRange;
          });

        const sorted = averaged.sort(
          (a, b) => (a.time as number) - (b.time as number),
        );

        console.log('✅ lastest priceData (sorted):', sorted);
        setPriceData(sorted);
      } catch (error) {
        console.error('🔥 fetchPriceData Error:', error);
      }
    };

    fetchPriceData();
  }, [pairId]);

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
      });

      const lineSeries = chart.addSeries(LineSeries, {
        color: '#00b894',
        lineWidth: 2,
      });

      lineSeries.setData(priceData);
      console.log('📊 Chart Completed');
      return () => chart.remove();
    } else {
      if (!chartContainerRef.current) {
        console.warn('❗ chartContainerRef is Empty');
      }
      if (priceData.length === 0) {
        console.warn('❗ priceData is Empty');
      }
    }
  }, [priceData]);

  return (
    <div className='dex-chart-wrapper'>
      <h2>DEX Chart - {pairId}</h2>
      <div ref={chartContainerRef} className='chart-container' />
    </div>
  );
};

export default DexChart;
