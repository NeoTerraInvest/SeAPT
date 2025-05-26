import useOrderBook from '@/hook/global/api/useOrderBook';
import { orderBook as styles } from '@styles';
import formatNumber from '@/utils/formatNumber';
// import { useEffect } from 'react';

// const formatNumber = (value: string | number, fraction = 2) =>
//   Number(value).toLocaleString(undefined, {
//     minimumFractionDigits: fraction,
//     maximumFractionDigits: fraction,
//   });

const OrderBook = ({
  marketId,
  isActive = false,
}: {
  marketId: string;
  isActive?: boolean;
}) => {
  const { orderBook, isLoading } = useOrderBook(marketId, isActive);
  const DISPLAY_LIMIT = 7;
  // console.log('✅ marketId:', marketId);
  // // 최대 수량 계산 (게이지 바용)
  // const maxQuantity = Math.max(
  //   ...orderBook.sell.map((order) => Number(order.quantity)),
  //   ...orderBook.buy.map((order) => Number(order.quantity)),
  //   1, // 0으로 나누는 것 방지
  // );
  // console.log('isActive:', isActive);
  // useEffect(() => {
  //   console.log('🟢 isActive:', isActive);
  // }, [isActive]);

  // 매도(SELL): 가격 오름차순
  const sellOrders = [...orderBook.sell]
    .sort((a, b) => Number(a.price) - Number(b.price))
    .slice(0, DISPLAY_LIMIT)
    .reverse();

  // 매수(BUY): 가격 내림차순
  const buyOrders = [...orderBook.buy]
    .sort((a, b) => Number(b.price) - Number(a.price))
    .slice(0, DISPLAY_LIMIT);

  // console.log('🔁 buyOrders:', buyOrders);

  return (
    <div className={styles.orderBook}>
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
      <div className={styles.orderBookHeader}>
        <div>Price (USDT)</div>
        <div id={styles.amount}>Amount (BTC)</div>
        <div id={styles.total}>Total (USDT)</div>
      </div>
      <div className={styles.sellOrders}>
        {sellOrders.map((order, index) => (
          <div key={`sell-${index}`} className={styles.orderRow}>
            <div className={styles.sellPrice}>
              {formatNumber(order.price, 4)}
            </div>
            <div className={styles.amount}>
              {/* <div
                className={styles.gaugeBar}
                style={{
                  width: `${(Number(order.quantity) / maxQuantity) * 100}%`,
                  backgroundColor: '#FF4D4D',
                }}
              /> */}
              <div id={styles.quantity}>{formatNumber(order.quantity, 4)}</div>
            </div>
            <div className={styles.total}>
              {formatNumber(Number(order.price) * Number(order.quantity), 4)}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.buyOrders}>
        {buyOrders.map((order, index) => (
          <div key={`buy-${index}`} className={styles.orderRow}>
            <div className={styles.buyPrice}>
              {formatNumber(order.price, 4)}
            </div>
            <div className={styles.amount}>
              {/* <div
                className={styles.gaugeBar}
                style={{
                  width: `${(Number(order.quantity) / maxQuantity) * 100}%`,
                  backgroundColor: '#6BF153',
                }}
              /> */}
              <div id={styles.quantity}>{formatNumber(order.quantity, 4)}</div>
            </div>
            <div className={styles.total}>
              {formatNumber(Number(order.price) * Number(order.quantity), 4)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderBook;
