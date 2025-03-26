import { useEffect, useRef, useState } from 'react';
import { header as styles } from '@styles';
import { headerLogoWeb, headerLogoMobile, hambuger } from '@assets';
import { useTrackingView, useModal } from '@model';
import { Translate, ModalFrame, MarginLayout } from '@components';
import React from 'react';

const Header = () => {
  const isMobile1260 = useTrackingView({ size: 1260 });
  const isMobile = useTrackingView({ size: 757 });
  // const isMobile500 = useTrackingView({ size: 500 });
  const { ModalComponent, openModal } = useModal();
  const [isOpacity, setOpacity] = useState<number>(1);
  const [isHover, setHover] = useState<boolean>(false);
  const lastScrollY = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scroll = currentScrollY - lastScrollY.current;

      setOpacity((prev) => {
        const details = scroll > 0 ? -0.05 : 0.05;
        const next = Math.min(1, Math.max(0, prev + details));
        return next;
      });

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const opacity = isHover ? 1 : isOpacity;
  const Wrapper = !isMobile1260 ? React.Fragment : MarginLayout;

  return (
    <div
      id={styles.debug}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      style={{ opacity }}
    >
      <Wrapper>
        <div id={styles.container}>
          <div id={styles.empty} />
          <div id={styles.group}>
            {isMobile ? (
              <div id={styles.hambuger} onClick={openModal}>
                <img src={headerLogoMobile} alt='' width={86} height={48} />
                <img src={hambuger} alt='' width={44} height={48} />
              </div>
            ) : (
              <img src={headerLogoWeb} alt='' width={120} height={48} />
            )}
            {/* <div id={styles.contents}> */}
            <div className={styles.content}>Roadmap</div>
            <div className={styles.content}>About</div>
            <div className={styles.content}>Tokenomics</div>
            <div className={styles.content}>Community</div>
            {/* </div> */}
          </div>
          <div className={styles.tool}>
            <Translate />
          </div>
          <ModalComponent modalChildren={<ModalFrame />} />
        </div>
      </Wrapper>
    </div>
  );
};

export default Header;
