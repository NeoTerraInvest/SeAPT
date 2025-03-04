import { AboutFrame, TokenFrame, Tokenomics, About } from '@components';
import styles from '@__styles/main.module.scss';
// import { Slider } from '@Model';
import { SliderFlex } from '@model';

const Dev = () => {
  return (
    <div id={styles.debug}>
      Dev
      <span>UI Desing System</span>
      <AboutFrame />
      <div style={{ padding: '30px' }}></div>
      <TokenFrame />
      <div style={{ padding: '30px' }}></div>
      <TokenFrame />
      <div style={{ padding: '30px' }}></div>
      <SliderFlex num={4}>{<div>test</div>}</SliderFlex>
      <div style={{ padding: '30px' }}></div>
      <Tokenomics />
      <div style={{ padding: '30px' }}></div>
      <About />
      <footer style={{ padding: '30px' }}></footer>
    </div>
  );
};

export default Dev;
