import { TokenFrame } from '@components';
import { tokenomics as styles } from '@/styles';
const Tokenomics = ({ num }: { num: number }) => {
  return (
    <section id={styles.debug}>
      {new Array(num).fill(null).map((_, i) =>
        i % 2 === 0 ? (
          <div key={i} className={styles.container}>
            <div id={styles.token}>
              <TokenFrame />
            </div>
            <div id={styles.token}>
              <TokenFrame />
            </div>
          </div>
        ) : null,
      )}
    </section>
  );
};

export default Tokenomics;
