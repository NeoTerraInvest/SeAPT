import { useRef } from 'react';
import { roadMap as styles } from '@styles';
import { useTrackingView } from '@model';
import { roadmap } from '@/data';
import { RoadMapFrame } from '@components';
import { translateKey } from '@/types';

const RoadMap = ({ translate }: { translate: translateKey }) => {
  const effectRef = useRef<HTMLDivElement>(null);

  const handleInMouse = () => {
    // console.log('Mouse in');
    autoClick();
  };
  const hanldeOutMouse = () => {
    // console.log('Mouse out');
  };
  const autoClick = () => {
    // console.log('Auto Click');
    if (effectRef.current) {
      effectRef.current.click();
    }
  };
  const isMobile = useTrackingView({ size: 767 });

  const contentMap: Record<string, { smallMedium: string; large: string }> = {
    0: {
      smallMedium: 'img_Roadmap_tapToEarn_sm',
      large: 'img_Roadmap_tapToEarn_lg',
    },
    1: {
      smallMedium: 'img_Roadmap_listing_on_sm',
      large: 'img_Roadmap_listing_on_lg',
    },
    2: {
      smallMedium: 'img_Roadmap_achivement_sm',
      large: 'img_Roadmap_achivement_lg',
    },
    3: {
      smallMedium: 'img_Roadmap_binance_sm',
      large: 'img_Roadmap_binance_lg',
    },
  };

  return (
    <div ref={effectRef} className={styles.debug}>
      <div
        ref={effectRef}
        onMouseEnter={handleInMouse}
        onMouseLeave={hanldeOutMouse}
        className={styles.effectLayout}
      >
        {isMobile ? (
          <div />
        ) : (
          <div
            ref={effectRef}
            id={styles.effectTop}
            onMouseEnter={handleInMouse}
            onMouseLeave={hanldeOutMouse}
          />
        )}
        <div className={styles.container}>
          {roadmap.data.map((el, index) => {
            return (
              <div key={index} id={styles.contents}>
                <RoadMapFrame
                  phase={el.phase}
                  date={el.date}
                  title={el.title}
                  description={el.description[translate]}
                  image={contentMap[el.id]}
                />
              </div>
            );
          })}
        </div>
        {isMobile ? (
          <div />
        ) : (
          <div
            ref={effectRef}
            onMouseEnter={handleInMouse}
            onMouseLeave={hanldeOutMouse}
            id={styles.effectBottom}
          />
        )}
      </div>
    </div>
  );
};

export default RoadMap;
