import { tokenListBase as styles } from '@styles';

const TokenListBase = ({
  isSearch,
  setSearch,
  isFilter,
  onFilterActive,
  isActiveFilter,
}: {
  isSearch: string;
  setSearch: (value: string) => void;
  isFilter: string[];
  onFilterActive: (filter: string) => void;
  isActiveFilter: string | null;
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

      <div className={styles.filter}>
        <div className={styles.filterList}>
          {/* <span>Quick Filter</span> */}
          {isFilter.map((el) => {
            const isActive = el === isActiveFilter;
            return (
              <button
                key={el}
                style={
                  isActive
                    ? {
                        backgroundColor: 'rgb(107, 241, 83, 0.7)',
                        color: 'var(--object-grey-6)',
                      }
                    : {}
                }
                onClick={() => onFilterActive(el)}
              >
                {el}
              </button>
            );
          })}
          <button
            style={
              isActiveFilter === 'Price Up 10%+'
                ? {
                    backgroundColor: 'rgb(107, 241, 83, 0.7)',
                    color: 'var(--object-grey-6)',
                  }
                : {}
            }
            onClick={() => onFilterActive('Price Up 10%+')}
          >
            Price Up 10%+
          </button>
          <button
            style={
              isActiveFilter === 'Volume 1M+'
                ? {
                    backgroundColor: 'rgb(107, 241, 83, 0.7)',
                    color: 'var(--object-grey-6)',
                  }
                : {}
            }
            onClick={() => onFilterActive('Volume 1M+')}
          >
            Volume 1M+
          </button>
          <button
            style={
              isActiveFilter === 'Volatility 5%+'
                ? {
                    backgroundColor: 'rgb(107, 241, 83, 0.7)',
                    color: 'var(--object-grey-6)',
                  }
                : {}
            }
            onClick={() => onFilterActive('Volatility 5%+')}
          >
            Volatility 5%+
          </button>
        </div>
      </div>

      {/* <div className={styles.baseList}> */}
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
