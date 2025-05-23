import formatNumber from './formatNumber';

type MarketId = string;

interface ChartData {
  lastPrice: number;
  currentTime: number;
  currentMinute: number;
  formattedPrice: string;
}

type ChartCallback = (data: ChartData) => void;

class ChartSocketManager {
  private socket: WebSocket | null = null;
  private subscribedMarkets = new Set<MarketId>();
  private callbacks = new Map<MarketId, ChartCallback>(); // 콜백 저장소
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
    };

    this.socket.onerror = (err) => {
      console.error('❌ WebSocket error', err);
    };

    this.socket.onclose = (e) => {
      console.log('🔌 WebSocket connection closed:', e.code);
      if (this.reconnectTries < this.MAX_RECONNECT) {
        setTimeout(() => {
          this.reconnectTries++;
          this.initSocket();
        }, 3000);
      }
    };

    this.socket.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      if (data.channel === 'marketdata' && data.ticker) {
        const lastPrice = parseFloat(data.ticker.last);
        const currentTime = Math.floor(Date.now() / 1000);
        const currentMinute = Math.floor(currentTime / 60);

        const marketId = data.market_id;
        const callback = this.callbacks.get(marketId);
        if (callback) {
          callback({
            lastPrice,
            currentTime,
            currentMinute,
            formattedPrice: formatNumber(data.ticker.last, 5),
          });
        }
      }
    };
  }

  public subscribe(marketId: MarketId, onData: ChartCallback) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      console.warn('🔴 socket is not open');
      return;
    }

    if (this.subscribedMarkets.has(marketId)) return;
    this.subscribedMarkets.add(marketId);
    this.callbacks.set(marketId, onData);

    const subscribeMsg = {
      type: 'subscribe',
      channel: 'marketdata',
      market_id: marketId,
      interval: 100,
      filter: ['ticker'],
    };
    this.socket.send(JSON.stringify(subscribeMsg));
    // console.log(`✅ subscribe: ${marketId}`);
  }

  public unsubscribe(marketId: MarketId) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) return;
    if (!this.subscribedMarkets.has(marketId)) return;

    this.subscribedMarkets.delete(marketId);
    this.callbacks.delete(marketId);

    const unsubscribeMsg = {
      type: 'unsubscribe',
      channel: 'marketdata',
      market_id: marketId,
    };

    this.socket.send(JSON.stringify(unsubscribeMsg));
    // console.log(`❎ unsubscribe: ${marketId}`);
  }
}

const chartSocketManager = new ChartSocketManager();
export default chartSocketManager;
