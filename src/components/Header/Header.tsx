import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { header as styles } from '@styles';
import { useTrackingView, useModal } from '@model';
import { Translate, ModalFrame, MarginLayout } from '@components';
import { HashLink } from 'react-router-hash-link';

const CDNURL = import.meta.env.VITE_API_CDN_URL;
const headerLogoWeb = `${CDNURL}/images/header-logo-120-48.svg`;
const headerLogoMobile = `${CDNURL}/images/header-logo-86-48.svg`;
const hambuger = `${CDNURL}/images/hambuger.svg`;

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
                <HashLink smooth to='/#target-show'>
                  <img
                    src={headerLogoMobile}
                    alt='logo-m'
                    width={86}
                    height={48}
                  />
                </HashLink>
                <img src={hambuger} alt='' width={44} height={48} />
              </div>
            ) : (
              <HashLink smooth to='/#target-show'>
                <img src={headerLogoWeb} alt='logo-w' width={120} height={48} />
              </HashLink>
            )}
            {/* <div id={styles.contents}> */}
            <HashLink className={styles.content} smooth to='/#target-roadMap'>
              Roadmap
            </HashLink>
            <HashLink className={styles.content} smooth to='/#target-about'>
              About
            </HashLink>
            <HashLink
              className={styles.content}
              smooth
              to='/#target-tokenomics'
            >
              Tokenomics
            </HashLink>
            <HashLink className={styles.content} smooth to='/#target-sns'>
              Community
            </HashLink>
            {/* </div> */}
          </div>
          <div className={styles.tool}>
            <Translate />
          </div>
          <ModalComponent
            modalChildren={(closeModal) => (
              <ModalFrame closeModal={closeModal} />
            )}
          />
        </div>
      </Wrapper>
    </div>
  );
};

export default Header;
