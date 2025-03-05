import { SliderFlex } from '@model';
import { AboutFrame } from '@components';
import { about as rawStyles } from '@/styles';
import { DefaultStyled } from '@/types';

const styles = rawStyles as unknown as DefaultStyled;

const About = () => {
  return (
    <SliderFlex num={4} styles={styles}>
      <AboutFrame />
    </SliderFlex>
  );
};

export default About;
