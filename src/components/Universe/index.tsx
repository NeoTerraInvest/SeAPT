import { univers as styles } from '@styles';

const CDNURL = import.meta.env.VITE_API_CDN_URL;

const Univers = () => {
  return (
    <div className={styles.debug}>
      <div className={styles.image}>
        <picture className={styles.picture}>
          <source
            srcSet={`${CDNURL}/images/univers/img_univers_sm.svg`}
            media='(max-width: 1024px)'
          />
          <source
            srcSet={`${CDNURL}/images/univers/img_univers_lg.svg`}
            media='(max-width: 1439px)'
          />
          <img
            src={`${CDNURL}/images/univers/img_univers_lg.svg`}
            alt='TokenFrame'
            loading='lazy'
          />
        </picture>
      </div>
      <div className={styles.contents}>
        <div className={styles.content}>
          <div className={styles.text}>
            <span>THE TIME IS NOW</span>
            <span>GET APT IN SPACE</span>
          </div>
          <button
            onClick={() =>
              window.open(
                import.meta.env.VITE_LINK_X,
                '_blank',
                'noopener,noreferrer',
              )
            }
          >
            Lean More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Univers;
