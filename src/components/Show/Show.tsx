import { show as styles } from '@styles';
import {
  // mainCharcter1439,
  mainCharcter1919,
  // mainCharcter1024,
  mainCharcter767,
} from '@assets';
import { useTrackingView } from '@model';
import { show } from '@data';
import { translateKey } from '@types';

const Show = ({ translate }: { translate: translateKey }) => {
  const isMobile767 = useTrackingView({ size: 900 });
  const isMobile880 = useTrackingView({ size: 880 });
  const isMobile340 = useTrackingView({ size: 340 });
  return (
    <div id={styles.debug}>
      {/* <div id={styles.background}>
        {isMobile767 || isMobile340 ? (
          <div id={styles.charcter}>
            <img src={mainCharcter767} alt='' loading='lazy' />
          </div>
        ) : null}
      </div> */}
      <div id={styles.container}>
        <div id={styles.background}>
          {isMobile767 || isMobile340 ? (
            <div id={styles.charcter}>
              <img src={mainCharcter767} alt='' loading='lazy' />
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
            <button id={styles.explore}>Explore</button>
          </div>
        </div>
        <div className={styles.image}>
          {!isMobile767 ? (
            <img
              id={styles.outer}
              src={!isMobile880 ? mainCharcter1919 : mainCharcter767}
              loading='lazy'
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Show;
