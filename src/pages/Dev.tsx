import { AboutFrame } from '@components';
import { TokenFrame } from '@components';
import styles from '@__styles/main.module.scss';
const Dev = () => {
  return (
    <div id={styles.debug}>
      Dev
      <span>UI Desing System</span>
      <AboutFrame />
      <div style={{ padding: '30px' }}></div>
      <TokenFrame />
      <footer style={{ padding: '30px' }}></footer>
    </div>
  );
};

export default Dev;
