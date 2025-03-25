import {
  Show,
  MarginLayout,
  BaseLayout,
  About,
  RoadMap,
  Train,
  SNS,
  Tokenomics,
  WhitePaper,
  Universe,
} from '@components';
import { useTrackingView } from '@model';
import { main as styles } from '@styles';
import { RootState } from '@/store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Main = () => {
  const isAbout = useTrackingView({ size: 1439 });
  const isToken = useTrackingView({ size: 768 });
  const language = useSelector((state: RootState) => state.translate.language);

  useEffect(() => {
    console.log(language);
  }, [language]);

  return (
    <BaseLayout>
      <MarginLayout>
        <Show />
      </MarginLayout>
      <MarginLayout>
        <h1 className={styles.roadmapMargin}>Roadmap</h1>
        <RoadMap />
      </MarginLayout>
      <MarginLayout auto={!isAbout}>
        <h1 className={styles.aboutMargin}>About SeAPT</h1>
        <About />
      </MarginLayout>
      <MarginLayout auto={!isToken}>
        <h1 className={styles.tokenomicsMargin}>Tokenomics</h1>
        <Tokenomics />
      </MarginLayout>
      <MarginLayout>
        <h1 className={styles.snsMargin}>Join the Community</h1>
        <SNS />
      </MarginLayout>
      <MarginLayout>
        <div className={styles.whitepaperMargin}>
          <WhitePaper />
        </div>
      </MarginLayout>
      <div className={styles.trainMargin}>
        <Train />
      </div>
      <MarginLayout>
        <div className={styles.universeMargin}>
          <h1 id={styles.universeMargin}>
            <span>Own the universe</span>
            <span>with SeAPT</span>
          </h1>
          <Universe />
        </div>
      </MarginLayout>
    </BaseLayout>
  );
};

export default Main;
