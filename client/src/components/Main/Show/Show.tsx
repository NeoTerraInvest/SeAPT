import { show as styles } from '@styles';
import { useTrackingView } from '@model';
import { show } from '@data';
import { translateKey } from '@types';
import { useNavigate } from 'react-router-dom';

const CDNURL = import.meta.env.VITE_API_CDN_URL;
const mainCharcter1919 = `${CDNURL}/images/global/1919/img_main_charcter.svg`;
const mainCharcter767 = `${CDNURL}/images/global/img_main_charcter_767.svg`;

const Show = ({ translate }: { translate: translateKey }) => {
  const isMobile767 = useTrackingView({ size: 900 });
  const isMobile880 = useTrackingView({ size: 880 });
  const isMobile340 = useTrackingView({ size: 340 });
  const navigate = useNavigate();

  return (
    <div id={styles.debug}>
      <div
        id={styles.container}
        style={{
          backgroundImage: `url('${CDNURL}/images/global/img_main_background.svg')`,
        }}
      >
        <div id={styles.background}>
          {isMobile767 || isMobile340 ? (
            <div id={styles.charcter}>
              <img src={mainCharcter767} alt='main' loading='lazy' />
            </div>
          ) : null}
        </div>
        <div id={styles.layout}>
          <div id={styles.show}>
            <div id={styles.group}>
              <div id={styles.title}>
                <div>How about finding</div>
                <div>a home in space?</div>
              </div>
              <div id={styles.content}>
                {show.data[0].description[translate]}
              </div>
            </div>
            <button
              id={styles.explore}
              onClick={() => {
                navigate('/TokenList');
              }}
            >
              Explore
            </button>
          </div>
        </div>
        <div className={styles.image}>
          {!isMobile767 ? (
            <img
              id={styles.outer}
              src={!isMobile880 ? mainCharcter1919 : mainCharcter767}
              loading='lazy'
              alt='main'
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Show;
