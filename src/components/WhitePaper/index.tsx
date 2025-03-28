import { whitepaper as styles } from '@styles';
import { whitepaper } from '@data';
import { translateKey } from '@types';

const CDNURL = import.meta.env.VITE_API_CDN_URL;

const WhitePaper = ({ translate }: { translate: translateKey }) => {
  return (
    <div className={styles.debug}>
      <div className={styles.image}>
        <picture className={styles.picture}>
          <source
            srcSet={`${CDNURL}/images/whitepaper/img_whitepaper_sm.svg`}
            media='(max-width: 1024px)'
          />
          <source
            srcSet={`${CDNURL}/images/whitepaper/img_whitepaper_lg.svg`}
            media='(max-width: 1439px)'
          />
          <img
            src={`${CDNURL}/images/whitepaper/img_whitepaper_lg.svg`}
            alt='TokenFrame'
            loading='lazy'
          />
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
                  `${import.meta.env.VITE_API_CDN_URL}/pdf/seapt_white_paper.pdf`,
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
