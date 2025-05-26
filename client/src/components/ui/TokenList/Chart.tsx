import { useState } from 'react';
import { useChartData } from '@/hook';

const Chart = ({ marketId = 'F3-USDT' }: { marketId: string }) => {
  const [isCurrentPrice, setCurrentPrice] = useState<string>('');
  const unit = marketId.split('-')[1];
  const name = marketId.split('-')[0];

  const { chartContainerRef, isLoading } = useChartData(
    marketId,
    true,
    (data) => setCurrentPrice(data.formattedPrice),
  );

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* 로딩 오버레이 */}
      {isLoading && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 10,
          }}
        >
          <div style={{ textAlign: 'center', color: 'white' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                border: '3px solid #f3f3f3',
                borderTop: '3px solid var(--chart-green)',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto',
              }}
            />
            <p style={{ marginTop: '8px' }}>차트 로딩 중...</p>
          </div>
        </div>
      )}
      {/* Chart */}
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
