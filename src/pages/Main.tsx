import { Show, Tokenomics, MarginLayout, BaseLayout, About } from '@components';
import { useTrackingView } from '@model';

const Main = () => {
  const isAbout = useTrackingView({ size: 1439 });
  const isToken = useTrackingView({ size: 768 });

  return (
    <BaseLayout>
      <MarginLayout>
        <Show />
      </MarginLayout>
      <span>Ready for Launch🚀</span>
      <MarginLayout auto={!isToken}>
        <Tokenomics />
      </MarginLayout>
      <span>Ready for Launch🚀</span>
      <MarginLayout auto={!isAbout}>
        <About />
      </MarginLayout>
    </BaseLayout>
  );
};

export default Main;
