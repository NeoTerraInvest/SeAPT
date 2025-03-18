import { show as styles } from '@styles';
import { mainBackground, mainCharcter1919 } from '@/assets';
import { useTrackingView } from '../Model';

const Show = () => {
  const isMobile = useTrackingView({ size: 767 });
  return (
    <div id={styles.debug}>
      <div id={styles.background}>
        <img src={mainBackground} alt='' />
        <img src='' alt='' />
      </div>
      <div id={styles.container}>
        <div id={styles.layout}>
          <div id={styles.show}>
            <div id={styles.group}>
              <div id={styles.title}>
                <div>How about finding</div>
                <div>a home in space?</div>
              </div>
              <div id={styles.content}>
                Let’s build a home in space! Send out my loyal companion, Se
                APT, to conquer the universe and create a home among the stars.
                When you venture into space and claim the stars, you’ll discover
                countless treasures (coins). Those treasures (coins) will turn
                me into a billionaire!
              </div>
              {/* <div id={styles.inner}>
                <div id={styles.innerimage} />
              </div> */}
            </div>
            <button>Explore</button>
          </div>
        </div>
        {!isMobile ? (
          <img
            id={styles.outer}
            src={mainCharcter1919}
            width={468}
            height={664}
            loading='lazy'
          />
        ) : null}
        {/* <div id={styles.outerimage} /> */}
      </div>
    </div>
  );
};

export default Show;
