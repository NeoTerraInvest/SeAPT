import { useRef } from 'react';
import { roadMap as styles } from '@styles';
import { useTrackingView } from '@model';
import { roadmap } from '@/data';
import { RoadMapFrame } from '@components';
import {
  roadMapAchivementLg,
  roadMapBinanceLg,
  roadMapListingLg,
  roadMapTapToEarnLg,
  roadMapAchivementSm,
  roadMapBinanceSm,
  roadMapListingSm,
  roadMapTapToEarnSm,
} from '@assets';
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
      smallMedium: roadMapTapToEarnSm,
      large: roadMapTapToEarnLg,
    },
    1: {
      smallMedium: roadMapListingSm,
      large: roadMapListingLg,
    },
    2: {
      smallMedium: roadMapAchivementSm,
      large: roadMapAchivementLg,
    },
    3: {
      smallMedium: roadMapBinanceSm,
      large: roadMapBinanceLg,
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
