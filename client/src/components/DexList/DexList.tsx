import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Token = {
  id: string;
  name: string;
  symbol: string;
};

type Pair = {
  id: string;
  token0: Token;
  token1: Token;
  reserveUSD: string;
};

const DexList = () => {
  const [pairs, setPairs] = useState<Pair[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const query = `
      {
        pairs(first: 50, orderBy: reserveUSD, orderDirection: desc) {
          id
          token0 { id name symbol }
          token1 { id name symbol }
          reserveUSD
        }
      }
    `;

    fetch('http://localhost:4000/api/uniswap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    })
      .then((res) => res.json())
      .then((json) => setPairs(json.data.pairs));
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>Token Pair List</h2>
      <ul>
        {pairs.map((pair) => (
          <div style={{ marginBottom: '20px' }}>
            <li
              key={pair.id}
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/DexStock/${pair.id}`)}
            >
              🪙 {pair.token0.symbol} / {pair.token1.symbol}
              Preview Token
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default DexList;
