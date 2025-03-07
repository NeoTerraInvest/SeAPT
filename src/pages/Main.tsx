import { Show, Tokenomics, MarginLayout, BaseLayout } from '@components';

const Main = () => {
  return (
    <BaseLayout>
      <MarginLayout>
        <Show />
      </MarginLayout>

      <span>Ready for Launch🚀</span>
      <MarginLayout>
        <Tokenomics />
      </MarginLayout>
      {/* <MarginLayout>
        <About />
      </MarginLayout> */}
    </BaseLayout>
  );
};

export default Main;
