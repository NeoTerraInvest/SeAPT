import { tokenFrame as styles } from '@/styles';

const TokenFrame = () => {
  return (
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
  );
};

export default TokenFrame;
