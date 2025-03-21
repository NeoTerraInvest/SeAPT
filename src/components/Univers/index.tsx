import { univers as styles } from '@styles';
import { universLg, universSm } from '@assets';

const Univers = () => {
  return (
    <div className={styles.debug}>
      <div className={styles.image}>
        <picture className={styles.picture}>
          <source srcSet={universSm} media='(max-width: 1024px)' />
          <source srcSet={universLg} media='(max-width: 1439px)' />
          <img src={universLg} alt='TokenFrame' loading='lazy' />
        </picture>
      </div>
      <div className={styles.contents}>
        <div className={styles.content}>
          <div className={styles.text}>
            <span>THE TIME IS NOW</span>
            <span>GET APT IN SPACE</span>
          </div>
          <button>Lean More</button>
        </div>
      </div>
    </div>
  );
};

export default Univers;
