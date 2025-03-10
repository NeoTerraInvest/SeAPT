import { roadMapFrame as styles } from '@styles';
import { useTrackingView } from '@model';
import { useEffect } from 'react';

const RoadMapFrame = () => {
  const isMobile = useTrackingView();
  useEffect(() => {
    console.log(isMobile);
  }, [isMobile]);
  return (
    <div id={styles.debug}>
      {isMobile && <div id={styles.imgCol}>img</div>}
      <div id={styles.text}>
        <div id={styles.date}>
          <span id={styles.phase}>Phase1</span>
          <span>2025.01</span>
        </div>
        <div id={styles.title}>TAP TO EARN Launch</div>
        <div id={styles.content}>
          Phase 1 introduces a Tap to Earn system, where users can earn rewards
          through simple tapping actions. This encourages user engagement and
          helps them familiarize themselves with the platform. The focus of this
          phase is on attracting users and building an initial community.
        </div>
      </div>
      {!isMobile && <div id={styles.imgRow}>img</div>}
    </div>
  );
};

export default RoadMapFrame;
