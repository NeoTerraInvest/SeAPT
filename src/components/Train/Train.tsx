import { InfinitySlider, useTrackingView } from '@model';
import {
  binance,
  certik,
  coinGecko,
  coinMarketCap,
  flooz,
  lbank,
} from '@/assets';
import { train as styles } from '@/styles';

const Train = () => {
  const isMobile = useTrackingView({ size: 767 });
  return (
    <div id={styles.debug}>
      <InfinitySlider>
        <div style={{ marginRight: '10px' }}>
          <img
            src={binance}
            alt=''
            width={isMobile ? 95 : 178}
            height={isMobile ? 64 : 120}
          />
        </div>
        <div>
          <img
            src={certik}
            alt=''
            width={isMobile ? 95 : 178}
            height={isMobile ? 64 : 120}
          />
        </div>
        <div>
          <img
            src={coinGecko}
            alt=''
            width={isMobile ? 95 : 178}
            height={isMobile ? 64 : 120}
          />
        </div>
        <div>
          <img
            src={coinMarketCap}
            alt=''
            width={isMobile ? 95 : 178}
            height={isMobile ? 64 : 120}
          />
        </div>
        <div>
          <img
            src={flooz}
            alt=''
            width={isMobile ? 95 : 178}
            height={isMobile ? 64 : 120}
          />
        </div>
        <div>
          <img
            src={lbank}
            alt=''
            width={isMobile ? 95 : 178}
            height={isMobile ? 64 : 120}
          />
        </div>
      </InfinitySlider>
    </div>
  );
};

export default Train;
