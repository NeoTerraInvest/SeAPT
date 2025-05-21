import { Chart, OrderBook } from '@components';
import { liveTokenList as styles } from '@styles';
const LiveTokenList = ({
  marketId,
  isActive,
}: {
  marketId: string;
  isActive: boolean;
}) => {
  return (
    <div className={styles.debug}>
      <div className={styles.chart}>
        <Chart marketId={marketId} />
      </div>
      <div className={styles.orderBook}>
        <OrderBook marketId={marketId} isActive={isActive} />
      </div>
    </div>
  );
};

export default LiveTokenList;
