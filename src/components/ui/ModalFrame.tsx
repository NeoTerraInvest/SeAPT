import { modalFrame as styles } from '@styles';

const ModalFrame = () => {
  return (
    <div className={styles.debug}>
      <div id={styles.element}>Roadmap</div>
      <div id={styles.element}>About</div>
      <div id={styles.element}>Tokenomics</div>
      <div id={styles.element}>Community</div>
    </div>
  );
};

export default ModalFrame;
