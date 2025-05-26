import { useApiData } from '@/hook';
import getApi from '@/service/get.api';
import { TokenFilterFrame } from '@components';
import { API } from '@types';
import { tokenListCategory as styles } from '@styles';
import formatNumber from '@/utils/formatNumber';

const TokenListCategory = ({
  category = 'category',
  type = 'volume',
}: {
  category: string;
  type?: string;
}) => {
  const { isData, refetch } = useApiData<API.tickerResList>({
    api: () => getApi<API.tickerResList>('/ticker'),
  });

  const getSortedTokens = (type: string) => {
    if (!isData) return [];

    switch (type) {
      case 'live':
        return [...isData.data]
          .sort(
            (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime(),
          )
          .slice(0, 3);
      case 'volume':
        return [...isData.data]
          .sort((a, b) => Number(b.quote_volume) - Number(a.quote_volume))
          .slice(0, 3);
      case 'price':
        return [...isData.data]
          .sort((a, b) => Number(b.last) - Number(a.last))
          .slice(0, 3);
      default:
        return isData.data.slice(0, 3);
    }
  };

  return (
    <div className={styles.debug}>
      <div className={styles.header}>
        <div id={styles.category}>{category}</div>
        {type === 'live' && (
          <button id={styles.refetch} onClick={refetch}>
            refetch
          </button>
        )}
      </div>
      {getSortedTokens(type)?.map((el) => (
        <TokenFilterFrame
          key={el.market_id}
          name={el.market_id.split('-')[0]}
          high={formatNumber(el.high, 2)}
          low={formatNumber(el.low, 2)}
        />
      ))}
    </div>
  );
};

export default TokenListCategory;
