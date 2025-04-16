import { useApiData } from '@hook';
import { useCallback, useEffect, useRef, useState } from 'react';
import getApi from '@/service/get.api';
import { API } from '@types';
import { MarginLayout, TokenListBase, TokenListFrame } from '@components';
const TokenList = () => {
  const [isSearch, setSearch] = useState<string>('');
  const [isVisible, setVisible] = useState<number>(0);
  const VISIBLE_COUNT = 10;
  const observerRef = useRef<HTMLDivElement>(null);
  const [isFilter, setFilter] = useState<string[]>([]);
  const { isData, isLoading, isError, isSuccess } =
    useApiData<API.tickerResList>({
      api: () => getApi<API.tickerResList>('/ticker'),
    });

  // searching filter
  const filteredData = isData?.data.filter((el) =>
    el.market_id.toLowerCase().includes(isSearch.toLowerCase()),
  );

  const displayData = filteredData?.slice(0, isVisible);

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

  return (
    // <BaseLayout>
    <div style={{ marginTop: '100px' }}>
      {/* {isLoading && <div>🟠 Loading...</div>} */}
      {isError && <div>🔴 Error: {isError}</div>}
      {isSuccess && (
        <>
          <MarginLayout>
            <TokenListBase
              isSearch={isSearch}
              setSearch={setSearch}
              isFilter={isFilter}
            />

            {displayData?.map((el) => (
              <TokenListFrame
                key={el.market_id}
                name={el.market_id.split('-')[0]}
                quote={el.market_id.split('-')[1]}
                price={el.last}
                baseVolume={Number(el.base_volume).toFixed(2)}
                range={el.change}
                high={el.high}
                low={el.low}
              />
            ))}

            {filteredData && isVisible < filteredData.length && (
              <div ref={observerRef}>
                <div>Loading more...</div>
              </div>
            )}
          </MarginLayout>
        </>
      )}
    </div>
    // </BaseLayout>
  );
};

export default TokenList;
