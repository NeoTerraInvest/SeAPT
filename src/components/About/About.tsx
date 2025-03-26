import { SliderFlex } from '@model';
import { AboutFrame } from '@components';
import { about as rawStyles } from '@/styles';
import { DefaultStyled, translateKey } from '@/types';
import { about } from '@data';
import {
  aboutCharity480,
  aboutCharity767,
  aboutCharity1024,
  aboutCharity1439,
  // aboutCharityMax,
  aboutCryptoCard480,
  aboutCryptoCard767,
  aboutCryptoCard1024,
  aboutCryptoCard1439,
  // aboutCryptoCardMax,
  aboutInvest480,
  aboutInvest767,
  aboutInvest1024,
  aboutInvest1439,
  // aboutInvestMax,
  aboutMarket480,
  aboutMarket767,
  aboutMarket1024,
  aboutMarket1439,
  // aboutMarketMax,
  aboutNFT480,
  aboutNFT767,
  aboutNFT1024,
  aboutNFT1439,
  // aboutNFTMax,
  aboutSWAP480,
  aboutSWAP767,
  aboutSWAP1024,
  aboutSWAP1439,
  // aboutSWAPMax,
  aboutTapToEarn480,
  aboutTapToEarn767,
  aboutTapToEarn1024,
  aboutTapToEarn1439,
  // aboutTapToEarnMax,
  aboutLuckyToEarn480,
  aboutLuckyToEarn767,
  aboutLuckyToEarn1024,
  aboutLuckyToEarn1439,
  // aboutLuckyToEarnMax,
  aboutWhitePaper480,
  aboutWhitePaper767,
  aboutWhitePaper1024,
  aboutWhitePaper1439,
  // aboutWhitePaperMax,
} from '@assets';

const styles = rawStyles as unknown as DefaultStyled;

const About = ({ translate }: { translate: translateKey }) => {
  const contentMap: Record<
    string,
    { small: string; smallMedium: string; medium: string; large: string }
  > = {
    0: {
      small: aboutTapToEarn480,
      smallMedium: aboutTapToEarn767,
      medium: aboutTapToEarn1024,
      large: aboutTapToEarn1439,
    },
    1: {
      small: aboutSWAP480,
      smallMedium: aboutSWAP767,
      medium: aboutSWAP1024,
      large: aboutSWAP1439,
    },
    2: {
      small: aboutCryptoCard480,
      smallMedium: aboutCryptoCard767,
      medium: aboutCryptoCard1024,
      large: aboutCryptoCard1439,
    },
    3: {
      small: aboutNFT480,
      smallMedium: aboutNFT767,
      medium: aboutNFT1024,
      large: aboutNFT1439,
    },
    4: {
      small: aboutWhitePaper480,
      smallMedium: aboutWhitePaper767,
      medium: aboutWhitePaper1024,
      large: aboutWhitePaper1439,
    },
    5: {
      small: aboutLuckyToEarn480,
      smallMedium: aboutLuckyToEarn767,
      medium: aboutLuckyToEarn1024,
      large: aboutLuckyToEarn1439,
    },
    6: {
      small: aboutMarket480,
      smallMedium: aboutMarket767,
      medium: aboutMarket1024,
      large: aboutMarket1439,
    },
    7: {
      small: aboutInvest480,
      smallMedium: aboutInvest767,
      medium: aboutInvest1024,
      large: aboutInvest1439,
    },
    8: {
      small: aboutCharity480,
      smallMedium: aboutCharity767,
      medium: aboutCharity1024,
      large: aboutCharity1439,
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
