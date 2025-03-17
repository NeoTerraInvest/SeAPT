import { SnsFrame } from '@components';
import { sns as styles } from '@styles';

const Sns = () => {
  return (
    <div className={styles.debug}>
      <SnsFrame />
      <SnsFrame />
      <SnsFrame />
    </div>
  );
};

export default Sns;
