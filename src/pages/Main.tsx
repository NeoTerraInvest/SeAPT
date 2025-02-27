import { main as styles } from '@styles';
import { Show } from '@/components';
const Main = () => {
  return (
    <div id={styles.debug}>
      <Show />
      <span id={styles.comment}>Ready for Launch🚀</span>
    </div>
  );
};

export default Main;
