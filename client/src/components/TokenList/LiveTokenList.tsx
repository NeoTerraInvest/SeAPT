import { Chart, OrderBook } from '@components';

const LiveTokenList = ({
  marketId,
  isActive,
}: {
  marketId: string;
  isActive: boolean;
}) => {
  return (
    <div style={{ display: 'flex', gap: '10px', padding: '30px' }}>
      <div style={{ width: '70%', height: '100%' }}>
        <Chart marketId={marketId} />
      </div>
      <div style={{ width: '30%' }}>
        <OrderBook marketId={marketId} isActive={isActive} />
      </div>
    </div>
  );
};

export default LiveTokenList;
