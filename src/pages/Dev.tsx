import { AboutFrame, TokenFrame, TokenFrameTest } from '@components';
import styles from '@__styles/main.module.scss';
// import { Slider } from '@Model';
import { Slider } from '@model';
const Dev = () => {
  return (
    <div id={styles.debug}>
      Dev
      <span>UI Desing System</span>
      <AboutFrame />
      <div style={{ padding: '30px' }}></div>
      <TokenFrame />
      <div style={{ padding: '30px' }}></div>
      <TokenFrameTest />
      <div style={{ padding: '30px' }}></div>
      <Slider num={4}>{<div>test</div>}</Slider>
      <footer style={{ padding: '30px' }}></footer>
    </div>
  );
};

export default Dev;
