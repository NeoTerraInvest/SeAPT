import { OrderBook, Chart } from '@components';

const LiveTokenList = () => {
  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <div style={{ width: '70%', height: '100%' }}>
        <Chart />
      </div>
      <div style={{ width: '30%' }}>
        <OrderBook marketId='BTC-USDT' />
      </div>
    </div>
  );
};

export default LiveTokenList;
