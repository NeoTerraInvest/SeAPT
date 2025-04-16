import { tokenListBase as styles } from '@styles';

const TokenListBase = ({
  isSearch,
  setSearch,
}: {
  isSearch: string;
  setSearch: (value: string) => void;
}) => {
  return (
    <div className={styles.debug}>
      <input
        type='text'
        value={isSearch}
        onChange={(e) => setSearch(e.target.value)}
        placeholder='Search token...'
        id={styles.search}
      />

      <div className={styles.baseList}>
        <div id={styles.token}>Token</div>
        <div id={styles.price}>Price</div>
        <div id={styles.volume}>Volume</div>
        <div id={styles.range}>24h Price Range </div>
      </div>
    </div>
  );
};

export default TokenListBase;
