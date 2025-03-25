import { TrainFrame as styles } from '@/styles';
import { useTrackingView } from '@model';
import {
  binance,
  certik,
  coinGecko,
  coinMarketCap,
  flooz,
  lbank,
  binanceMobile,
  certikMobile,
  coinGeckoMobile,
  coinMarketCapMobile,
  floozMobile,
  lbankMobile,
} from '@/assets';
const TrainFrame = () => {
  const isMobile = useTrackingView({ size: 767 });
  return (
    <div id={styles.debug}>
      <div>
        <img
          src={isMobile ? binanceMobile : binance}
          alt=''
          width={isMobile ? 95 : 178}
          height={isMobile ? 64 : 120}
          loading='lazy'
        />
      </div>
      <div>
        <img
          src={isMobile ? certikMobile : certik}
          alt=''
          width={isMobile ? 95 : 178}
          height={isMobile ? 64 : 120}
          loading='lazy'
        />
      </div>
      <div>
        <img
          src={isMobile ? coinGeckoMobile : coinGecko}
          alt=''
          width={isMobile ? 95 : 178}
          height={isMobile ? 64 : 120}
          loading='lazy'
        />
      </div>
      <div>
        <img
          src={isMobile ? coinMarketCapMobile : coinMarketCap}
          alt=''
          width={isMobile ? 95 : 178}
          height={isMobile ? 64 : 120}
          loading='lazy'
        />
      </div>
      <div>
        <img
          src={isMobile ? floozMobile : flooz}
          alt=''
          width={isMobile ? 95 : 178}
          height={isMobile ? 64 : 120}
          loading='lazy'
        />
      </div>
      <div>
        <img
          src={isMobile ? lbankMobile : lbank}
          alt=''
          width={isMobile ? 95 : 178}
          height={isMobile ? 64 : 120}
          loading='lazy'
        />
      </div>
    </div>
  );
};

export default TrainFrame;
