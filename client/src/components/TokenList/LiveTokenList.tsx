import { Chart, OrderBook } from '@components';
// import { useEffect } from 'react';

const LiveTokenList = ({ marketId }: { marketId: string }) => {
  // useEffect(() => {
  //   console.log('---marketId---', marketId);
  // }, [marketId]);
  return (
    <div style={{ display: 'flex', gap: '10px', padding: '10px' }}>
      <div style={{ width: '70%', height: '100%' }}>
        <Chart marketId={marketId} />
      </div>
      <div style={{ width: '30%' }}>
        <OrderBook marketId={marketId} />
      </div>
    </div>
  );
};

export default LiveTokenList;
