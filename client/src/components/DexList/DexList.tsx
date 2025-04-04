import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

const ERC20_ABI = [
  'function symbol() view returns (string)',
  'function name() view returns (string)',
];

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
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const query = `
      {
        pairs(first: 100, orderBy: reserveUSD, orderDirection: desc) {
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
      .then(async (json) => {
        const provider = new ethers.JsonRpcProvider('https://eth.llamarpc.com');

        const resolvedPairs = await Promise.all(
          json.data.pairs.map(async (pair: Pair) => {
            const resolveToken = async (token: Token) => {
              if (!token.symbol || token.symbol === 'unknown') {
                try {
                  const contract = new ethers.Contract(
                    token.id,
                    ERC20_ABI,
                    provider,
                  );
                  const symbol = await contract.symbol();
                  const name = await contract.name();
                  return { ...token, symbol, name };
                } catch (err) {
                  console.warn(`Failed to resolve token ${token.id} : ${err}`);
                  return token;
                }
              }
              return token;
            };

            const [token0Resolved, token1Resolved] = await Promise.all([
              resolveToken(pair.token0),
              resolveToken(pair.token1),
            ]);

            return {
              ...pair,
              token0: token0Resolved,
              token1: token1Resolved,
            };
          }),
        );

        setPairs(resolvedPairs);
      })
      .catch((error) => {
        console.error('❌ GraphQL fetch error:', error);
      })
      .finally(() => {
        setLoading(false); // ✅ 무조건 로딩 끝내기
      });
  }, []);

  const validPairs = pairs.filter(
    (pair) =>
      pair.token0.symbol &&
      pair.token0.symbol.toLowerCase() !== 'unknown' &&
      pair.token1.symbol &&
      pair.token1.symbol.toLowerCase() !== 'unknown',
  );

  // 🔍 검색 필터
  const filteredPairs = validPairs.filter((pair) => {
    const keyword = search.toLowerCase();
    return (
      pair.token0.symbol.toLowerCase().includes(keyword) ||
      pair.token1.symbol.toLowerCase().includes(keyword)
    );
  });

  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>Token Pair List</h2>

      {loading ? (
        <p>⏳ 불러오는 중...</p> // 👈 로딩 표시
      ) : (
        <>
          <input
            placeholder='🔍 토큰명으로 검색 (예: pepe)'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: '6px 12px',
              marginBottom: '16px',
              borderRadius: '8px',
              border: '1px solid #ccc',
            }}
          />
          <ul>
            {filteredPairs.map((pair) => (
              <div key={pair.id} style={{ marginBottom: '20px' }}>
                <li
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/DexStock/${pair.id}`)}
                >
                  {/* <span>
                    <img
                      src={`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${pair.token0.id}/logo.png`}
                      alt={pair.token0.symbol}
                      style={{ width: 20, height: 20, marginRight: 6 }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target.src !== '/fallback.png') {
                          target.src = '/fallback.png';
                        }
                      }}
                      loading='lazy'
                    />
                  </span> */}
                  <span>🪙 {pair.token0.symbol}</span> /{' '}
                  <span>{pair.token1.symbol}</span> /{' '}
                  <span>(${Number(pair.reserveUSD).toFixed(2)})</span>
                  <div style={{ marginLeft: '8px', color: '#888' }}>
                    {pair.id}
                  </div>
                </li>
              </div>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default DexList;
