// client/src/hook/global/api/useOrderBook.ts
import { useEffect, useRef, useState, useCallback } from 'react';
import getApi from '@/service/get.api';

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

const useOrderBook = (marketId: string = 'BTC-USDT') => {
  const [orderBook, setOrderBook] = useState<OrderBookState>({
    buy: [],
    sell: [],
  });
  const ws = useRef<WebSocket | null>(null);
  const orderBookRef = useRef<OrderBookState>({ buy: [], sell: [] });

  // REST API로 초기 호가창 데이터 가져오기
  const fetchInitialOrderBook = useCallback(async () => {
    try {
      const response = await getApi<OrderBookResponse>(
        `/order_book?market_id=${marketId}`,
      );
      const buyOrders = (response.data?.buy ?? []).map((item) => ({
        price: item.price,
        quantity: item.quantity,
        side: 'buy' as const,
      }));
      const sellOrders = (response.data?.sell ?? []).map((item) => ({
        price: item.price,
        quantity: item.quantity,
        side: 'sell' as const,
      }));

      const initialOrderBook: OrderBookState = {
        buy: buyOrders,
        sell: sellOrders,
      };

      orderBookRef.current = initialOrderBook;
      setOrderBook(initialOrderBook);
    } catch (error) {
      console.error('Failed to fetch initial order book:', error);
    }
  }, [marketId]);

  useEffect(() => {
    // 초기 데이터 로드
    fetchInitialOrderBook();

    // WebSocket 연결
    ws.current = new WebSocket('wss://api.probit.com/api/exchange/v1/ws');

    ws.current.onopen = () => {
      const subscribeMessage = {
        channel: 'marketdata',
        filter: ['order_books'],
        interval: 100,
        market_id: marketId,
        type: 'subscribe',
      };
      ws.current?.send(JSON.stringify(subscribeMessage));
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.channel === 'marketdata' && data.order_books) {
        const currentOrderBook = { ...orderBookRef.current };

        data.order_books.forEach((order: OrderBookData) => {
          if (order.side === 'buy') {
            const index = currentOrderBook.buy.findIndex(
              (item) => item.price === order.price,
            );
            if (index !== -1) {
              currentOrderBook.buy[index].quantity = order.quantity;
            } else if (Number(order.quantity) > 0) {
              currentOrderBook.buy.push(order);
            }
          } else {
            const index = currentOrderBook.sell.findIndex(
              (item) => item.price === order.price,
            );
            if (index !== -1) {
              if (Number(order.quantity) === 0) {
                currentOrderBook.sell.splice(index, 1);
              } else {
                currentOrderBook.sell[index].quantity = order.quantity;
              }
            } else if (Number(order.quantity) > 0) {
              currentOrderBook.sell.push(order);
            }
          }
        });

        // 정렬 유지
        currentOrderBook.buy.sort((a, b) => Number(b.price) - Number(a.price));
        currentOrderBook.sell.sort((a, b) => Number(a.price) - Number(b.price));

        orderBookRef.current = currentOrderBook;
        setOrderBook(currentOrderBook);
      }
    };

    return () => {
      ws.current?.close();
    };
  }, [marketId, fetchInitialOrderBook]);

  return orderBook;
};

export default useOrderBook;
