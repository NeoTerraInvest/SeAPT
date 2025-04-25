import { TokenListFrame } from '@/components';

const TokenRanking = () => {
  return (
    <div
      style={{
        margin: '50px 0px',
        borderTop: '1px solid var(--object-grey-3)',
      }}
    >
      <TokenListFrame
        name='Test Name'
        quote='Test Quote'
        price='Test Price'
        baseVolume='Test Volume'
        high='Test High'
        low='Test Low'
      />
    </div>
  );
};

export default TokenRanking;
