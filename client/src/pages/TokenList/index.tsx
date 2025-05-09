import { useSearchParams } from 'react-router-dom';
import { useApiData } from '@hook';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import getApi from '@/service/get.api';
import { API } from '@types';
import formatNumber from '@/utils/formatNumber';
import {
  BaseLayout,
  MarginLayout,
  TokenListBase,
  TokenListCategory,
  MemoizedTokenListFrame,
  // TokenRanking,
} from '@components';
import { tokenList as styles } from '@styles';

const TokenList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialFilter = searchParams.get('filter');

  const VISIBLE_COUNT = 10;
  const [isSearch, setSearch] = useState<string>('');
  const [isVisible, setVisible] = useState<number>(VISIBLE_COUNT);
  const observerRef = useRef<HTMLDivElement>(null);
  const [isFilter, setFilter] = useState<string[]>([]);
  const [isActiveFilter, setActiveFilter] = useState<string | null>(
    initialFilter,
  );
  const [isOpenChart, setIsOpenChart] = useState<string | null>(null);

  const handleOpenChart = useCallback((marketId: string) => {
    setIsOpenChart((prev) => (prev === marketId ? null : marketId));
  }, []);

  const { isData, isLoading, isError, isSuccess } =
    useApiData<API.tickerResList>({
      api: () => getApi<API.tickerResList>('/ticker'),
    });

  // searching filter
  const filteredData = isData?.data.filter((el) => {
    const matchedSearch = el.market_id
      .toLowerCase()
      .includes(isSearch.toLowerCase());
    const matchedFilter = isActiveFilter
      ? (() => {
          switch (isActiveFilter) {
            case 'Price Up 10%+':
              return Number(el.change) > 10;
            case 'Volume 1M+':
              return Number(el.base_volume) > 1000000;
            case 'Volatility 5%+':
              return Math.abs(Number(el.change)) > 5;
            default:
              return el.market_id.split('-')[1] === isActiveFilter;
          }
        })()
      : true;
    return matchedSearch && matchedFilter;
  });

  // duplicate check
  const handleFilterActive = useCallback(
    (filter: string) => {
      if (isActiveFilter === filter) {
        searchParams.delete('filter');
      } else {
        searchParams.set('filter', filter);
      }
      setSearchParams(searchParams);
      setActiveFilter(isActiveFilter === filter ? null : filter);
      setVisible(VISIBLE_COUNT);
    },
    [isActiveFilter, searchParams, setSearchParams],
  );

  // infinite scroll
  const fetchMoreData = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (
        target.isIntersecting &&
        filteredData &&
        isVisible < filteredData.length
      ) {
        setVisible((prev) =>
          Math.min(prev + VISIBLE_COUNT, filteredData.length),
        );
      }
    },
    [filteredData, isVisible],
  );

  // fetch data
  useEffect(() => {
    if (isSuccess) {
      console.log('🟢 isData:', isData);
      const filter = [
        ...new Set(isData?.data.map((el) => el.market_id.split('-')[1])),
      ];
      setFilter(filter);
    }
    if (isLoading) {
      console.log('🟠 isLoading:', isLoading);
    }
    if (isError) {
      console.log('🔴 isError:', isError);
    }
  }, [isData, isError, isLoading, isSuccess]);

  // infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(fetchMoreData, {
      root: null,
      rootMargin: '20px',
      threshold: 0.1,
    });
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
  }, [fetchMoreData]);

  const memoizedDisplayData = useMemo(() => {
    if (!filteredData) return [];
    return filteredData.slice(0, isVisible).map((el) => ({
      name: el.market_id.split('-')[0],
      quote: el.market_id.split('-')[1],
      price: formatNumber(el.last ? String(el.last) : '0'), // null 체크 추가
      baseVolume: Number(el.quote_volume || 0).toFixed(2), // null 체크 추가
      range: el.change || '0', // null 체크 추가
      high: formatNumber(el.high ? String(el.high) : '0'), // null 체크 추가
      low: formatNumber(el.low ? String(el.low) : '0'), // null 체크 추가
      marketId: el.market_id,
      isChart: isOpenChart === el.market_id,
    }));
  }, [filteredData, isOpenChart, isVisible]);

  return (
    <BaseLayout>
      <div style={{ marginTop: '150px' }}>
        {/* {isLoading && <div>🟠 Loading...</div>} */}
        {isError && <div>🔴 Error: {isError}</div>}
        {isSuccess && (
          <>
            <MarginLayout>
              {/* <h1>🔥Live Token Ranking</h1>
              <TokenRanking /> */}
              <div className={styles.tokenListCategory}>
                <TokenListCategory category='🪙 Top Price' type='price' />
                <TokenListCategory category='💰 Top Volume' type='volume' />
                <TokenListCategory category='🔥 Crypto Live' type='live' />
              </div>
              <TokenListBase
                isSearch={isSearch}
                setSearch={setSearch}
                isFilter={isFilter}
                onFilterActive={handleFilterActive}
                isActiveFilter={isActiveFilter}
              />

              {memoizedDisplayData?.map((el) => (
                <MemoizedTokenListFrame
                  key={el.marketId}
                  {...el}
                  onOpenChart={handleOpenChart}
                />
              ))}

              {filteredData && isVisible < filteredData.length && (
                <div ref={observerRef}>
                  <div>Loading more...</div>
                </div>
              )}
              <div style={{ padding: '30px' }} />
            </MarginLayout>
          </>
        )}
      </div>
    </BaseLayout>
  );
};

export default TokenList;
