import { main as styles } from '@styles';
import { Show, Tokenomics } from '@components';
const Main = () => {
  return (
    <div id={styles.debug}>
      <Show />
      <span id={styles.comment}>Ready for Launch🚀</span>
      <Tokenomics num={4} />
    </div>
  );
};

export default Main;
