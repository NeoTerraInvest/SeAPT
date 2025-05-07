import { tokenListFrame as styles } from '@styles';
import { memo } from 'react';
import { useTrackingView } from '@model';

const TokenListFrame = memo(
  ({
    name = 'Test Name',
    quote = 'Test Quote',
    price = 'Test Price',
    baseVolume = 'Test Volume',
    // range = 'Test Range',
    high = 'Test High',
    low = 'Test Low',
    marketId = 'Test Market Id',
  }: {
    name: string;
    quote: string;
    price: string;
    baseVolume: string;
    range?: string;
    high: string;
    low: string;
    marketId?: string;
  }) => {
    const tempState = false;
    const isMobile750 = useTrackingView({ size: 750 });
    const isMobile450 = useTrackingView({ size: 450 });
    return (
      <div
        className={styles.debug}
        onClick={() =>
          window.open(
            `https://www.probit.com/en-us/app/exchange/${marketId}`,
            '_blank',
          )
        }
      >
        <div className={styles.token}>
          <div className={styles.logo}>
            <img
              src={`${import.meta.env.VITE_PROBIT_CDN}/${name}.png`}
              width={32}
              height={32}
              alt={quote}
            />
          </div>
          <div className={styles.name}>
            <div>{name}</div>
            <div>{quote}</div>
          </div>
        </div>
        {tempState && <div>graph</div>}
        <div className={styles.price}>
          <div>{price}</div>
          <div>{quote}</div>
          {/* <div>{range}</div> */}
        </div>
        {!isMobile750 && (
          <div className={styles.volume}>
            <div>{baseVolume}</div>
            <div>{name}</div>
          </div>
        )}
        {!isMobile450 && (
          <div className={styles.range}>
            <div id={styles.high}>{high}</div>
            <div id={styles.low}>{low}</div>
          </div>
        )}
      </div>
    );
  },
);

export default TokenListFrame;
