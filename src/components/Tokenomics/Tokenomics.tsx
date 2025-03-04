import { TokenFrame } from '@components';
import { tokenomics as rawStyles } from '@/styles';
import { SliderFlex } from '@model';
import { DefaultStyled } from '@/types';

const styles = rawStyles as unknown as DefaultStyled;

const Tokenomics = () => {
  return (
    <SliderFlex num={4} styles={styles} type={false}>
      <TokenFrame />
    </SliderFlex>
  );
};

export default Tokenomics;
