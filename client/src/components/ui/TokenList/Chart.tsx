import { useState } from 'react';
import { useChartData } from '@/hook';

const Chart = ({ marketId = 'F3-USDT' }: { marketId: string }) => {
  const [isCurrentPrice, setCurrentPrice] = useState<string>('');
  const unit = marketId.split('-')[1];
  const name = marketId.split('-')[0];

  const { chartContainerRef } = useChartData(marketId, true, (data) =>
    setCurrentPrice(data.formattedPrice),
  );

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ width: '100%', margin: '15px 0' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {isCurrentPrice}
          </div>
          <button
            style={{
              background: 'var(--object-grey-6)',
              padding: '10px',
              maxWidth: '100px',
              width: '100%',
              borderRadius: '5px',
              color: 'var(--chart-green)',
            }}
            onClick={() => {
              window.open(
                `https://www.probit.com/en-us/app/exchange/${marketId}`,
                '_blank',
              );
            }}
          >
            Buy
          </button>
        </div>
        <div style={{ marginTop: '5px', fontSize: '12px', color: '#ccc' }}>
          {name}/{unit}
        </div>
      </div>
      <div
        ref={chartContainerRef}
        style={{ width: '100%', flex: 1, minHeight: 0 }}
      />
    </div>
  );
};

export default Chart;
