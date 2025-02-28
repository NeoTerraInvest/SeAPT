import { useEffect, useState } from 'react';
import { footer as styles } from '@styles';
import { footerLogo } from '@/assets';

const Footer = () => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    console.log(isMobile);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  return (
    <div id={styles.debug}>
      {isMobile ? (
        <div className={styles.contents}>
          <img src={footerLogo} width={120} height={48} alt='' />
        </div>
      ) : (
        <div className={styles.contents}>
          <img src={footerLogo} width={120} height={48} alt='' />
          <div className={styles.information}>
            <div id={styles.info}>contact : email@email.com</div>
            <div id={styles.info}>Space APT © 2025. All rights reserved.</div>
          </div>
        </div>
      )}
      <div id={styles.container}>
        <div className={styles.contents}>
          <div className={styles.title}>SITE MAP</div>
          <div className={styles.group}>
            <div>Roadmap</div>
            <div>About</div>
            <div>Tokenomics</div>
            <div>Community</div>
          </div>
        </div>
        <div className={styles.contents}>
          <div className={styles.title}>MARKET</div>
          <div className={styles.group}>
            <div>View Chart</div>
            <div>Swap</div>
          </div>
        </div>
        <div className={styles.contents}>
          <div className={styles.title}>COMMUNITY</div>
          <div className={styles.group}>
            <div>X</div>
            <div>Telegram</div>
            <div>Youtube</div>
          </div>
        </div>
      </div>
      {isMobile ? (
        <div className={styles.contents}>
          <div className={styles.information}>
            <div id={styles.info}>contact : email@email.com</div>
            <div id={styles.info}>Space APT © 2025. All rights reserved.</div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Footer;
