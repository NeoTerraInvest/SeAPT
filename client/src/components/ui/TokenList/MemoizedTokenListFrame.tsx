import { memo, useCallback } from 'react';
import { TokenListFrame } from '@components';

interface MemoizedTokenListFrameProps {
  marketId: string;
  name: string;
  quote: string;
  price: string;
  baseVolume: string;
  range: string;
  high: string;
  low: string;
  isChart: boolean;
  onOpenChart: (marketId: string) => void;
}

const MemoizedTokenListFrame = memo(
  ({ marketId, onOpenChart, ...props }: MemoizedTokenListFrameProps) => {
    const handleChartToggle = useCallback(() => {
      onOpenChart(marketId);
    }, [marketId, onOpenChart]);

    return (
      <TokenListFrame
        {...props}
        marketId={marketId}
        onOpenChart={handleChartToggle}
      />
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.isChart === nextProps.isChart &&
      prevProps.name === nextProps.name &&
      prevProps.quote === nextProps.quote &&
      prevProps.price === nextProps.price &&
      prevProps.baseVolume === nextProps.baseVolume &&
      prevProps.high === nextProps.high &&
      prevProps.low === nextProps.low
    );
  },
);

export default MemoizedTokenListFrame;
