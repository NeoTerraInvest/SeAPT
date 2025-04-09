import { error as styles } from '@styles';
import { useNavigate } from 'react-router-dom';

const CDNURL = import.meta.env.VITE_API_CDN_URL;
const mainCharcter1919 = `${CDNURL}/images/global/1919/img_main_charcter.svg`;
const mainBackground = `${CDNURL}/images/global/img_main_background.svg`;

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.debug}>
      <div id={styles.background}>
        <img src={mainBackground} alt='' />
      </div>
      <div className={styles.container}>
        <div id={styles.image}>
          <img src={mainCharcter1919} alt='' width={468} height={664} />
        </div>
        <div className={styles.contents}>
          <div id={styles.subtitle}>OOPS! </div>
          <div id={styles.title}>{':( 404 NotFound'}</div>
          <div id={styles.subcontent}>Sorry we couldn't find that page.</div>
          <div id={styles.content}>
            <span>From here you can either check out the front.</span>
            <span>page or try searching for what you were trying to find.</span>
          </div>
          <div id={styles.button}>
            <button
              className={styles.goback}
              onClick={() => {
                navigate('/');
              }}
            >
              Go Space
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
