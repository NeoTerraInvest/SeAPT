import {
  Show,
  Tokenomics,
  MarginLayout,
  BaseLayout,
  About,
  RoadMap,
  Train,
  SNS,
} from '@components';
import { useTrackingView } from '@model';

const Main = () => {
  const isAbout = useTrackingView({ size: 1439 });
  const isToken = useTrackingView({ size: 768 });

  return (
    <BaseLayout>
      <MarginLayout>
        <Show />
      </MarginLayout>
      <MarginLayout>
        <RoadMap />
      </MarginLayout>
      <MarginLayout auto={!isAbout}>
        <About />
      </MarginLayout>
      <span>Ready for Launch🚀</span>
      <MarginLayout auto={!isToken}>
        <Tokenomics />
      </MarginLayout>
      <div style={{ padding: '30px' }} />
      <MarginLayout>
        <SNS />
      </MarginLayout>
      <div style={{ padding: '30px' }} />
      {/* <MarginLayout> */}
      <Train />
      {/* </MarginLayout> */}
      <div style={{ padding: '30px' }} />
    </BaseLayout>
  );
};

export default Main;
