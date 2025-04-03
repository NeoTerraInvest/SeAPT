import { SliderFlex } from '@model';
import { AboutFrame } from '@components';
import { about as rawStyles } from '@/styles';
import { DefaultStyled, translateKey } from '@/types';
import { about } from '@data';

const styles = rawStyles as unknown as DefaultStyled;

const About = ({ translate }: { translate: translateKey }) => {
  const contentMap: Record<
    string,
    { small: string; smallMedium: string; medium: string; large: string }
  > = {
    0: {
      small: 'img_about_tapToEarn_480',
      smallMedium: 'img_about_tapToEarn_767',
      medium: 'img_about_tapToEarn_1024',
      large: 'img_about_tapToEarn_1439',
    },
    1: {
      small: 'img_about_swap_480',
      smallMedium: 'img_about_swap_767',
      medium: 'img_about_swap_1024',
      large: 'img_about_swap_1439',
    },
    2: {
      small: 'img_about_cryptoCard_480',
      smallMedium: 'img_about_cryptoCard_767',
      medium: 'img_about_cryptoCard_1024',
      large: 'img_about_cryptoCard_1439',
    },
    3: {
      small: 'img_about_NFT_480',
      smallMedium: 'img_about_NFT_767',
      medium: 'img_about_NFT_1024',
      large: 'img_about_NFT_1439',
    },
    4: {
      small: 'img_about_whitepaper_480',
      smallMedium: 'img_about_whitepaper_767',
      medium: 'img_about_whitepaper_1024',
      large: 'img_about_whitepaper_1439',
    },
    5: {
      small: 'img_about_luckyToEarn_480',
      smallMedium: 'img_about_luckyToEarn_767',
      medium: 'img_about_luckyToEarn_1024',
      large: 'img_about_luckyToEarn_1439',
    },
    6: {
      small: 'img_about_market_480',
      smallMedium: 'img_about_market_767',
      medium: 'img_about_market_1024',
      large: 'img_about_market_1439',
    },
    7: {
      small: 'img_about_invest_480',
      smallMedium: 'img_about_invest_767',
      medium: 'img_about_invest_1024',
      large: 'img_about_invest_1439',
    },
    8: {
      small: 'img_about_charity_480',
      smallMedium: 'img_about_charity_767',
      medium: 'img_about_charity_1024',
      large: 'img_about_charity_1439',
    },
  };

  return (
    <SliderFlex num={about.data.length} styles={styles} type='singleSlider'>
      {about.data.map((el, index) => {
        return (
          <AboutFrame
            key={index}
            id={el.id}
            image={contentMap[el.id]}
            title={el.title}
            description={el.description[translate]}
          />
        );
      })}
    </SliderFlex>
  );
};

export default About;
