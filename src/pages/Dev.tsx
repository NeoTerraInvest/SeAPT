import { WhitePaper } from '@components';
import styles from '@__styles/main.module.scss';

const Dev = () => {
  return (
    <div id={styles.debug} style={{ backgroundColor: 'gray' }}>
      Dev
      <span>UI Desing System</span>
      <div style={{ padding: '30px' }}></div>
      <WhitePaper />
      <footer style={{ padding: '30px' }}></footer>
    </div>
  );
};

export default Dev;
