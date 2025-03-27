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
import { translateKey } from '@types';

const Main = ({ translate }: { translate: translateKey }) => {
  const isAbout = useTrackingView({ size: 1439 });
  const isToken = useTrackingView({ size: 768 });
  return (
    <BaseLayout>
      <MarginLayout>
        <div className={styles.showMargin} id='target-show' />
        <Show translate={translate} />
      </MarginLayout>
      <MarginLayout>
        <h1 className={styles.roadmapMargin} id='target-roadMap'>
          Roadmap
        </h1>
        <RoadMap translate={translate} />
      </MarginLayout>
      <MarginLayout auto={!isAbout}>
        <h1 className={styles.aboutMargin} id='target-about'>
          About SeAPT
        </h1>
        <About translate={translate} />
      </MarginLayout>
      <MarginLayout auto={!isToken}>
        <h1 className={styles.tokenomicsMargin} id='target-tokenomics'>
          Tokenomics
        </h1>
        <Tokenomics translate={translate} />
      </MarginLayout>
      <MarginLayout>
        <h1 className={styles.snsMargin} id='target-sns'>
          Join the Community
        </h1>
        <SNS />
      </MarginLayout>
      <MarginLayout>
        <div className={styles.whitepaperMargin} id='target-whitepaper'>
          <WhitePaper translate={translate} />
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
