type MarketId = string;
type OrderBookData = {
  price: string;
  quantity: string;
  side: 'buy' | 'sell';
};
type OrderBookState = {
  buy: OrderBookData[];
  sell: OrderBookData[];
};
type OrderBookCallback = (data: OrderBookData[]) => void; // 콜백 타입
type ConnectionCallback = () => void; // 연결 상태 콜백 타입

class MarketSocketManager {
  private socket: WebSocket | null = null;
  private subscribedMarkets = new Set<MarketId>();
  private callbacks = new Map<MarketId, OrderBookCallback>(); // 콜백 저장소
  private connectionCallbacks = new Map<
    MarketId,
    {
      onConnect?: ConnectionCallback;
      onDisconnect?: ConnectionCallback;
      onError?: (error: Error) => void;
    }
  >();
  private reconnectTries = 0;
  private MAX_RECONNECT = 5;

  constructor() {
    this.initSocket();
  }

  private initSocket() {
    this.socket = new WebSocket('wss://api.probit.com/api/exchange/v1/ws');

    this.socket.onopen = () => {
      console.log('📡 WebSocket connected');
      this.reconnectTries = 0;

      this.subscribedMarkets.forEach((marketId) => {
        const subscribeMsg = {
          type: 'subscribe',
          channel: 'marketdata',
          market_id: marketId,
          interval: 100,
          filter: ['order_books'],
        };
        this.socket?.send(JSON.stringify(subscribeMsg));
      });

      this.connectionCallbacks.forEach(({ onConnect }) => {
        onConnect?.();
      });
    };

    this.socket.onerror = (err) => {
      console.error('❌ WebSocket error', err);
      // 에러 콜백 실행
      this.connectionCallbacks.forEach(({ onError }) => {
        onError?.(new Error('WebSocket error'));
      });
    };

    this.socket.onclose = (e) => {
      console.warn('🔌 WebSocket connection closed:', e.code);
      // 연결 끊김 콜백 실행
      this.connectionCallbacks.forEach(({ onDisconnect }) => {
        onDisconnect?.();
      });
      if (this.reconnectTries < this.MAX_RECONNECT) {
        setTimeout(() => {
          this.reconnectTries++;
          this.initSocket();
        }, 3000);
      }
    };

    this.socket.onmessage = (msg) => {
      const data = JSON.parse(msg.data);

      if (data.channel === 'marketdata' && data.order_books && data.market_id) {
        const marketId = data.market_id;
        const orders: OrderBookData[] = data.order_books;

        const orderBook: OrderBookState = {
          buy: [],
          sell: [],
        };

        orders.forEach((order) => {
          if (order.side === 'buy')
            orderBook.buy.push(order); //array에 맞게 push
          else orderBook.sell.push(order);
        });

        // 해당 마켓 콜백 실행
        const callback = this.callbacks.get(marketId); //Map에 맞게 get
        if (callback) {
          callback([...orderBook.buy, ...orderBook.sell]);
        }
      }
    };
  }

  public subscribe(
    marketId: MarketId,
    onData: OrderBookCallback,
    onConnect?: ConnectionCallback,
    onDisconnect?: ConnectionCallback,
    onError?: (error: Error) => void,
  ) {
    // 연결 상태 콜백 저장
    this.connectionCallbacks.set(marketId, {
      onConnect,
      onDisconnect,
      onError,
    });

    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      console.warn('🔴 socket is not open');
      // 연결이 안 된 상태라면 연결 끊김 콜백 실행
      onDisconnect?.();
      return;
    }

    // 중복 방지
    if (this.subscribedMarkets.has(marketId)) return;
    this.subscribedMarkets.add(marketId); //Set에 맞게 add 사용
    this.callbacks.set(marketId, onData); // 중복을 허용하지 않게 구현

    const subscribeMsg = {
      type: 'subscribe',
      channel: 'marketdata',
      market_id: marketId,
      interval: 100,
      filter: ['order_books'],
    };

    this.socket.send(JSON.stringify(subscribeMsg));
    console.log(`✅ subscribe: ${marketId}`);
  }

  public unsubscribe(marketId: MarketId) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) return;
    if (!this.subscribedMarkets.has(marketId)) return;

    this.subscribedMarkets.delete(marketId);
    this.callbacks.delete(marketId);
    this.connectionCallbacks.delete(marketId);

    const unsubscribeMsg = {
      type: 'unsubscribe',
      channel: 'marketdata',
      market_id: marketId,
    };

    this.socket.send(JSON.stringify(unsubscribeMsg));
    console.log(`❎ unsubscribe: ${marketId}`);
  }

  public close() {
    this.socket?.close();
  }
}

const socketManager = new MarketSocketManager();
export default socketManager;
