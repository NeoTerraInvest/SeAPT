import { main as styles } from '@styles';
import { Show, Tokenomics, Header, Footer } from '@components';

const Main = () => {
  return (
    <div id={styles.debug}>
      <Header />
      <div className={styles.margin}>
        <Show />
      </div>

      <span id={styles.comment}>Ready for Launch🚀</span>
      <div className={styles.margin}>
        <Tokenomics num={4} />
      </div>

      <Footer />
    </div>
  );
};

export default Main;
