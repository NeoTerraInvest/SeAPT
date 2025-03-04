import { tokenFrameTest as styles } from '@/styles';
import { MarginLayout } from '@components';

const TokenFrame = () => {
  return (
    <MarginLayout>
      <div id={styles.debug}>
        <div id={styles.image}>{/* <img src='' alt='TokenFrame' /> */}</div>
        <div id={styles.container}>
          <div id={styles.type}>burn</div>
          <div id={styles.property}>300 trillion</div>
          <div id={styles.description}>
            <div>body_sm</div>
            <div>body_sm</div>
            <div>body_sm</div>
          </div>
        </div>
      </div>
    </MarginLayout>
  );
};

export default TokenFrame;
