import { TokenFrame } from '@components';
import { tokenomics as rawStyles } from '@styles';
import { SliderFlex, useTrackingView } from '@model';
import { DefaultStyled } from '@types';
import { tokenomics } from '@data';
import {
  tokenmicsSpaceAPT767,
  tokenmicsSpaceAPT1024,
  tokenmicsSpaceAPT1439,
  tokenmicsSpaceAPTMax,
  tokenmicsTotalSupply767,
  tokenmicsTotalSupply1024,
  tokenmicsTotalSupply1439,
  tokenmicsTotalSupplyMax,
  tokenmicsLP767,
  tokenmicsLP1024,
  tokenmicsLP1439,
  tokenmicsLPMax,
  tokenmicsBurn767,
  tokenmicsBurn1024,
  tokenmicsBurn1439,
  tokenmicsBurnMax,
  tokenmicsCharity767,
  tokenmicsCharity1024,
  tokenmicsCharity1439,
  tokenmicsCharityMax,
  tokenmicsMarketing767,
  tokenmicsMarketing1024,
  tokenmicsMarketing1439,
  tokenmicsMarketingMax,
} from '@assets';

const styles = rawStyles as unknown as DefaultStyled;

const Tokenomics = () => {
  const isMobile = useTrackingView();

  const contentMap: Record<
    string,
    { small: string; smallMedium: string; medium: string; large: string }
  > = {
    0: {
      small: tokenmicsSpaceAPT767,
      smallMedium: tokenmicsSpaceAPT1024,
      medium: tokenmicsSpaceAPT1439,
      large: tokenmicsSpaceAPTMax,
    },
    1: {
      small: tokenmicsTotalSupply767,
      smallMedium: tokenmicsTotalSupply1024,
      medium: tokenmicsTotalSupply1439,
      large: tokenmicsTotalSupplyMax,
    },
    2: {
      small: tokenmicsLP767,
      smallMedium: tokenmicsLP1024,
      medium: tokenmicsLP1439,
      large: tokenmicsLPMax,
    },
    3: {
      small: tokenmicsBurn767,
      smallMedium: tokenmicsBurn1024,
      medium: tokenmicsBurn1439,
      large: tokenmicsBurnMax,
    },
    4: {
      small: tokenmicsCharity767,
      smallMedium: tokenmicsCharity1024,
      medium: tokenmicsCharity1439,
      large: tokenmicsCharityMax,
    },
    5: {
      small: tokenmicsMarketing767,
      smallMedium: tokenmicsMarketing1024,
      medium: tokenmicsMarketing1439,
      large: tokenmicsMarketingMax,
    },
  };

  return (
    <div style={{ display: 'flex', backgroundColor: 'tomato' }}>
      <SliderFlex
        num={tokenomics.data.length}
        styles={styles}
        type={isMobile ? 'singleSlider' : 'dobule'}
      >
        {tokenomics.data.map((el, index) => {
          return (
            <TokenFrame
              key={index}
              title={el.title}
              image={contentMap[el.id]}
              price={el.price}
              description={el.description.eng}
            />
          );
        })}
        {/* <TokenFrame /> */}
      </SliderFlex>
    </div>
  );
};

export default Tokenomics;
