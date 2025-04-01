import { useEffect, useRef, useState } from 'react';
import { createChart, LineData, LineSeries } from 'lightweight-charts';
import { fetchPriceData } from '@model';
import '../../styles/components/DexChart/DexChart.scss';

const DexChart = () => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const [priceData, setPriceData] = useState<LineData[]>([]);

  useEffect(() => {
    fetchPriceData().then((data) => setPriceData(data));
  }, []);

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

      return () => chart.remove();
    }
  }, [priceData]);

  return (
    <div className='dex-chart-wrapper'>
      <h2>DEX 차트</h2>
      <div ref={chartContainerRef} className='chart-container' />
    </div>
  );
};

export default DexChart;
