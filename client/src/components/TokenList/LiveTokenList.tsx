import { OrderBook, Chart } from '@components';

const LiveTokenList = () => {
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <Chart />
      <OrderBook marketId='BTC-USDT' />
    </div>
  );
};

export default LiveTokenList;
