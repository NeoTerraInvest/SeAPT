import { aboutFrame as styles } from '@styles';

const AboutFrame = () => {
  return (
    <div id={styles.debug}>
      <div id={styles.aboutFrame}>
        <div id={styles.group}>
          <div id={styles.title}>body_lg</div>
          <div id={styles.description}>
            <div>body_sm</div>
            <div>body_sm</div>
          </div>
        </div>
        <div id={styles.layout}>
          <button>btn_text</button>
        </div>
      </div>
    </div>
  );
};

export default AboutFrame;
