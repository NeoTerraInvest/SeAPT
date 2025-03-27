import { whitepaperLg, whitepaperSm } from '@assets';
import { whitepaper as styles } from '@styles';
import { whitepaper } from '@data';
import { translateKey } from '@types';

const WhitePaper = ({ translate }: { translate: translateKey }) => {
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
            {whitepaper.data[0].description[translate]}
          </div>
          <div className={styles.button}>
            <button
              id={styles.btn}
              onClick={() => {
                window.open(
                  `${import.meta.env.VITE_API_VERCEL_URL}/pdf/seapt_white_paper.pdf`,
                  '_blank',
                  'noopener,noreferrer',
                );
              }}
            >
              Get White Paper
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhitePaper;
