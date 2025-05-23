// client/src/lib/tradingview/datafeed.ts

export interface Bar {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface SymbolInfo {
  name: string;
}

export interface DatafeedConfiguration {
  supported_resolutions: string[];
}

export interface CandleApiResponse {
  time: string; // e.g. "2024-05-19T00:00:00.000Z"
  open: string;
  high: string;
  low: string;
  close: string;
  base_volume: string;
}

export interface Datafeed {
  onReady: (callback: (config: DatafeedConfiguration) => void) => void;
  getBars: (
    symbolInfo: SymbolInfo,
    resolution: string,
    from: number,
    to: number,
    onResult: (bars: Bar[]) => void,
    onError: (error: unknown) => void,
  ) => void | Promise<void>;
}

export const datafeed: Datafeed = {
  onReady: (callback) => {
    const configuration: DatafeedConfiguration = {
      supported_resolutions: ['1', '5', '15', '60', 'D'],
    };
    setTimeout(() => callback(configuration), 0);
  },

  getBars: async (symbolInfo, resolution, from, to, onResult, onError) => {
    try {
      const interval =
        resolution === '1'
          ? '1m'
          : resolution === '5'
            ? '5m'
            : resolution === '15'
              ? '15m'
              : resolution === '60'
                ? '1h'
                : '1d';

      const url = `https://api.probit.com/api/exchange/v1/market_candles?market_id=${symbolInfo.name}&interval=${interval}&start_time=${from}&end_time=${to}`;
      const res = await fetch(url);
      const json = await res.json();

      const bars: Bar[] = (json.data as CandleApiResponse[]).map((candle) => ({
        time: new Date(candle.time).getTime(),
        open: parseFloat(candle.open),
        high: parseFloat(candle.high),
        low: parseFloat(candle.low),
        close: parseFloat(candle.close),
        volume: parseFloat(candle.base_volume),
      }));

      onResult(bars);
    } catch (err) {
      onError(err);
    }
  },
};
