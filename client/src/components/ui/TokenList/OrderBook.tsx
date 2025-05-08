// client/src/components/ui/TokenList/OrderBook.tsx
import useOrderBook from '@/hook/global/api/useOrderBook';
import { orderBook as styles } from '@styles';

interface OrderBookProps {
  marketId: string;
}

const formatNumber = (value: string | number, fraction = 2) =>
  Number(value).toLocaleString(undefined, {
    minimumFractionDigits: fraction,
    maximumFractionDigits: fraction,
  });

const OrderBook = ({ marketId }: OrderBookProps) => {
  const orderBook = useOrderBook(marketId);
  const DISPLAY_LIMIT = 7;

  // 최대 수량 계산 (게이지 바용)
  const maxQuantity = Math.max(
    ...orderBook.sell.map((order) => Number(order.quantity)),
    ...orderBook.buy.map((order) => Number(order.quantity)),
    1, // 0으로 나누는 것 방지
  );

  // 매도(SELL): 가격 오름차순
  const sellOrders = [...orderBook.sell]
    .sort((a, b) => Number(a.price) - Number(b.price))
    .slice(0, DISPLAY_LIMIT)
    .reverse();

  // 매수(BUY): 가격 내림차순
  const buyOrders = [...orderBook.buy]
    .sort((a, b) => Number(b.price) - Number(a.price))
    .slice(0, DISPLAY_LIMIT);

  return (
    <div className={styles.orderBook}>
      <div className={styles.orderBookHeader}>
        <div>Price (USDT)</div>
        <div>Amount (BTC)</div>
        <div>Total (USDT)</div>
      </div>

      <div className={styles.sellOrders}>
        {sellOrders.map((order, index) => (
          <div key={`sell-${index}`} className={styles.orderRow}>
            <div className={styles.sellPrice}>
              {formatNumber(order.price, 2)}
            </div>
            <div className={styles.quantityContainer}>
              <div
                className={styles.gaugeBar}
                style={{
                  width: `${(Number(order.quantity) / maxQuantity) * 100}%`,
                  backgroundColor: '#FF4D4D',
                }}
              />
              <div className={styles.quantity}>
                {formatNumber(order.quantity, 4)}
              </div>
            </div>
            <div className={styles.total}>
              {formatNumber(Number(order.price) * Number(order.quantity), 2)}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.buyOrders}>
        {buyOrders.map((order, index) => (
          <div key={`buy-${index}`} className={styles.orderRow}>
            <div className={styles.buyPrice}>
              {formatNumber(order.price, 2)}
            </div>
            <div className={styles.quantityContainer}>
              <div
                className={styles.gaugeBar}
                style={{
                  width: `${(Number(order.quantity) / maxQuantity) * 100}%`,
                  backgroundColor: '#6BF153',
                }}
              />
              <div className={styles.quantity}>
                {formatNumber(order.quantity, 4)}
              </div>
            </div>
            <div className={styles.total}>
              {formatNumber(Number(order.price) * Number(order.quantity), 2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderBook;
