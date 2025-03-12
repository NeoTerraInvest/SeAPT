// need refactoring use to map syntax
import { TrainFrame as styles } from '@/styles';
import {
  binance,
  certik,
  coinGecko,
  coinMarketCap,
  flooz,
  lbank,
} from '@/assets';
const TrainFrame = () => {
  return (
    <div id={styles.debug}>
      <img src={binance} alt='' />
      <img src={certik} alt='' />
      <img src={coinGecko} alt='' />
      <img src={coinMarketCap} alt='' />
      <img src={flooz} alt='' />
      <img src={lbank} alt='' />
    </div>
  );
};

export default TrainFrame;
