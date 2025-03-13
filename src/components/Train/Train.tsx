import { InfinitySlider } from '@model';
// import {
//   binance,
//   certik,
//   coinGecko,
//   coinMarketCap,
//   flooz,
//   lbank,
// } from '@/assets';
// import { train as styles } from '@/styles';
import { TrainFrame } from '@components';

const Train = () => {
  return (
    <InfinitySlider>
      <TrainFrame />
    </InfinitySlider>
  );
};

export default Train;
