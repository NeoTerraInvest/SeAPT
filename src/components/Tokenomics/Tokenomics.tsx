import { TokenFrame } from '@components';
import { tokenomics as rawStyles } from '@/styles';
import { SliderFlex } from '@model';
import { DefaultStyled } from '@/types';
import useTrackingView from '../Model/useTrackingView';

const styles = rawStyles as unknown as DefaultStyled;

const Tokenomics = () => {
  const isMobile = useTrackingView();

  return (
    <SliderFlex
      num={4}
      styles={styles}
      type={isMobile ? 'singleSlider' : 'dobule'}
    >
      <TokenFrame />
    </SliderFlex>
  );
};

export default Tokenomics;
