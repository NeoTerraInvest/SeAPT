import { tokenListFrame as styles } from '@styles';
import { memo } from 'react';
const TokenListFrame = memo(
  ({
    name = 'Test Name',
    quote = 'Test Quote',
    price = 'Test Price',
    baseVolume = 'Test Volume',
    // range = 'Test Range',
    high = 'Test High',
    low = 'Test Low',
  }: {
    name: string;
    quote: string;
    price: string;
    baseVolume: string;
    range?: string;
    high: string;
    low: string;
  }) => {
    const tempState = false;
    return (
      <div className={styles.debug}>
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
        <div className={styles.volume}>
          <div>{baseVolume}</div>
          <div>{name}</div>
        </div>
        <div className={styles.range}>
          <div id={styles.high}>{high}</div>
          <div id={styles.low}>{low}</div>
        </div>
      </div>
    );
  },
);

export default TokenListFrame;
