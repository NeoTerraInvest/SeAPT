import { useEffect, useState } from 'react';
import { TokenFrame } from '@components';
import { tokenomics as rawStyles } from '@/styles';
import { SliderFlex } from '@model';
import { DefaultStyled } from '@/types';

const styles = rawStyles as unknown as DefaultStyled;

const Tokenomics = () => {
  const [isMobile, setMobile] = useState<boolean>(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const mobileState = window.innerWidth <= 768;
      setMobile(mobileState);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <SliderFlex num={4} styles={styles} type={isMobile}>
      <TokenFrame />
    </SliderFlex>
  );
};

export default Tokenomics;
