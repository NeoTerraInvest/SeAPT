import { useEffect, useState, useCallback, useRef } from 'react';
import getApi from '@/service/get.api';
import socketManager from '@/utils/MarketSocketManager';

interface OrderBookData {
  price: string;
  quantity: string;
  side: 'buy' | 'sell';
}

interface OrderBookState {
  buy: OrderBookData[];
  sell: OrderBookData[];
}

interface OrderBookResponse {
  data: {
    buy: Array<{ price: string; quantity: string }>;
    sell: Array<{ price: string; quantity: string }>;
  };
}

const useOrderBook = (marketId: string, isActive: boolean) => {
  const [orderBook, setOrderBook] = useState<OrderBookState>({
    buy: [],
    sell: [],
  });

  const orderBookRef = useRef<OrderBookState>({
    buy: [],
    sell: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchInitialOrderBook = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getApi<OrderBookResponse>(
        `/order_book?market_id=${marketId}`,
      );
      const buy = response.data?.buy ?? [];
      const sell = response.data?.sell ?? [];

      const initialState: OrderBookState = {
        buy: buy.map((item) => ({ ...item, side: 'buy' as const })),
        sell: sell.map((item) => ({ ...item, side: 'sell' as const })),
      };

      orderBookRef.current = initialState;
      setOrderBook(initialState);
    } catch (error) {
      console.error('❌ 초기 호가창 로딩 실패:', error);
    } finally {
      setIsLoading(false);
    }
  }, [marketId]);

  useEffect(() => {
    fetchInitialOrderBook();
  }, [fetchInitialOrderBook]);

  useEffect(() => {
    if (isActive) {
      socketManager.subscribe(marketId, (patchList: OrderBookData[]) => {
        const current = { ...orderBookRef.current };

        patchList.forEach((update) => {
          const list = current[update.side];
          const index = list.findIndex((o) => o.price === update.price);

          if (index !== -1) {
            if (Number(update.quantity) === 0) {
              list.splice(index, 1); // 수량 0이면 삭제
            } else {
              list[index].quantity = update.quantity; // 수량 업데이트
            }
          } else {
            if (Number(update.quantity) > 0) {
              list.push(update); // 새로 추가
            }
          }
        });

        // 정렬 유지
        current.buy.sort((a, b) => Number(b.price) - Number(a.price));
        current.sell.sort((a, b) => Number(a.price) - Number(b.price));

        orderBookRef.current = current;
        setOrderBook({ ...current });
      });
    } else {
      socketManager.unsubscribe(marketId);
    }

    return () => {
      socketManager.unsubscribe(marketId);
    };
  }, [isActive, marketId]);

  return { orderBook, isLoading };
};

export default useOrderBook;
