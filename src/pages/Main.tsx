import {
  Show,
  Tokenomics,
  MarginLayout,
  BaseLayout,
  TokenFrameTest,
} from '@components';

const Main = () => {
  return (
    <BaseLayout>
      <MarginLayout>
        <Show />
      </MarginLayout>

      <span>Ready for Launch🚀</span>
      <MarginLayout>
        <Tokenomics num={4} />
      </MarginLayout>
      <TokenFrameTest />
    </BaseLayout>
  );
};

export default Main;
