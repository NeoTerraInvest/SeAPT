import {
  AboutFrame,
  TokenFrame,
  Tokenomics,
  About,
  RoadMapFrame,
  RoadMap,
  TrainFrame,
  Train,
  // SnsFrame,
  SNS,
} from '@components';
import styles from '@__styles/main.module.scss';
// import { Slider } from '@Model';
import { SliderFlex } from '@model';

const Dev = () => {
  return (
    <div id={styles.debug} style={{ backgroundColor: 'gray' }}>
      Dev
      <span>UI Desing System</span>
      <div style={{ padding: '30px' }}></div>
      <AboutFrame />
      <div style={{ padding: '30px' }}></div>
      <RoadMap num={4}>
        <RoadMapFrame />
      </RoadMap>
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
      {/* <RoadMapFrame /> */}
      <div style={{ padding: '30px' }}></div>
      <TrainFrame />
      <div style={{ padding: '30px' }}></div>
      <Train />
      <div style={{ padding: '30px' }}></div>
      {/* <SnsFrame /> */}
      <div style={{ padding: '30px' }}></div>
      <SNS />
      <footer style={{ padding: '30px' }}></footer>
    </div>
  );
};

export default Dev;
