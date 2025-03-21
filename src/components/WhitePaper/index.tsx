import { whitepaperLg, whitepaperSm } from '@assets';
import { whitepaper as styles } from '@styles';

const WhitePaper = () => {
  return (
    <div className={styles.debug}>
      <div className={styles.image}>
        <picture className={styles.picture}>
          <source srcSet={whitepaperSm} media='(max-width: 1024px)' />
          <source srcSet={whitepaperLg} media='(max-width: 1439px)' />
          <img src={whitepaperLg} alt='TokenFrame' loading='lazy' />
        </picture>
      </div>
      <div className={styles.contents}>
        <div className={styles.text}>
          <div id={styles.title}>White Paper</div>
          <div id={styles.description}>
            The "Lucky to Earn" model rewards users for engaging with digital
            platforms by completing tasks or participating in luck-based events.
            It merges entertainment with financial incentives, enhancing user
            experience and reshaping the digital economy.
          </div>
          <div className={styles.button}>
            <button id={styles.btn}>Get White Paper</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhitePaper;
