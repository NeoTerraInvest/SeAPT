import { WhitePaper, Universe } from '@components';
import { main as styles } from '@styles';

const Dev = () => {
  return (
    <div id={styles.debug} style={{ backgroundColor: 'gray' }}>
      Dev
      <span>UI Desing System</span>
      <div style={{ padding: '30px' }}></div>
      <WhitePaper />
      <div style={{ padding: '30px' }}></div>
      <Universe />
      <footer style={{ padding: '30px' }}></footer>
    </div>
  );
};

export default Dev;
