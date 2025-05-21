import { useEffect, useState } from 'react';
import getApi from '@/service/get.api';

interface ChartData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface ChartResponse {
  data: {
    timestamp: string;
    open: string;
    high: string;
    low: string;
    close: string;
  }[];
}

const useChartData = (marketId: string, interval: string = '1h') => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await getApi<ChartResponse>(
          `/candles?market_id=${marketId}&interval=${interval}`,
        );

        const formattedData = response.data.map((candle) => ({
          time: candle.timestamp,
          open: Number(candle.open),
          high: Number(candle.high),
          low: Number(candle.low),
          close: Number(candle.close),
        }));

        setChartData(formattedData);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : '차트 데이터를 불러오는데 실패했습니다.',
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchChartData();
  }, [marketId, interval]);

  return { chartData, isLoading, error };
};

export default useChartData;
