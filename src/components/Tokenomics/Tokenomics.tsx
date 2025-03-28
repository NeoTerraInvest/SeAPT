import { TokenFrame } from '@components';
import { tokenomics as rawStyles } from '@styles';
import { SliderFlex, useTrackingView } from '@model';
import { DefaultStyled, translateKey } from '@types';
import { tokenomics } from '@data';

const styles = rawStyles as unknown as DefaultStyled;

const Tokenomics = ({ translate }: { translate: translateKey }) => {
  const isMobile = useTrackingView();

  const contentMap: Record<
    string,
    { small: string; smallMedium: string; medium: string; large: string }
  > = {
    0: {
      small: 'img_tokenomics_spaceAPT_767',
      smallMedium: 'img_tokenomics_spaceAPT_1024',
      medium: 'img_tokenomics_spaceAPT_1439',
      large: 'img_tokenomics_spaceAPT_Max',
    },
    1: {
      small: 'img_tokenomics_total_supply_767',
      smallMedium: 'img_tokenomics_total_supply_1024',
      medium: 'img_tokenomics_total_supply_1439',
      large: 'img_tokenomics_total_supply_Max',
    },
    2: {
      small: 'img_tokenomics_lp_767',
      smallMedium: 'img_tokenomics_lp_1024',
      medium: 'img_tokenomics_lp_1439',
      large: 'img_tokenomics_lp_Max',
    },
    3: {
      small: 'img_tokenomics_burn_767',
      smallMedium: 'img_tokenomics_burn_1024',
      medium: 'img_tokenomics_burn_1439',
      large: 'img_tokenomics_burn_Max',
    },
    4: {
      small: 'img_tokenomics_charity_767',
      smallMedium: 'img_tokenomics_charity_1024',
      medium: 'img_tokenomics_charity_1439',
      large: 'img_tokenomics_charity_Max',
    },
    5: {
      small: 'img_tokenomics_marketing_767',
      smallMedium: 'img_tokenomics_marketing_1024',
      medium: 'img_tokenomics_marketing_1439',
      large: 'img_tokenomics_marketing_Max',
    },
  };

  return (
    <div>
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
              description={el.description[translate]
                .split('\n')
                .map((line, idx) => (
                  <span key={idx}>
                    {line}
                    <br />
                  </span>
                ))}
            />
          );
        })}
        {/* <TokenFrame /> */}
      </SliderFlex>
    </div>
  );
};

export default Tokenomics;
