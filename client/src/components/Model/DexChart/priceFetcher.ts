import { LineData, UTCTimestamp } from 'lightweight-charts';

const endpoint = 'http://localhost:4000/api/uniswap';

interface Swap {
  timestamp: string;
  amountUSD: string;
}

interface GraphResponse {
  data?: {
    swaps?: Swap[];
    pool?: {
      swaps?: Swap[];
    };
  };
  errors?: { message: string }[];
}

const fetchPriceData = async (): Promise<LineData[]> => {
  const query = `
    {
      swaps(first: 50, orderBy: timestamp, orderDirection: asc) {
        timestamp
        amountUSD
      }
    }
  `;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }

  const json: GraphResponse = await response.json();
  console.log('📦 Raw GraphQL Response:', JSON.stringify(json, null, 2));
  const rawData = json.data?.swaps ?? [];

  const seen = new Set<number>();
  const cleaned: LineData[] = [];

  for (const swap of rawData) {
    const ts = Number(swap.timestamp) as UTCTimestamp;
    if (!seen.has(ts)) {
      seen.add(ts);
      cleaned.push({
        time: ts,
        value: Number(swap.amountUSD),
      });
    }
  }

  cleaned.sort((a, b) => (a.time as number) - (b.time as number));

  return cleaned;
};

export default fetchPriceData;
