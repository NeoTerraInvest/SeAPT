import { useEffect, useState } from 'react';
import { header as styles } from '@/styles';
import { headerLogoWeb, headerLogoMobile, hambuger } from '@/assets';
const Header = () => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 480);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    window.addEventListener('resize', handleResize);
    console.log(isMobile);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  return (
    <div id={styles.debug}>
      <div id={styles.container}>
        {isMobile ? (
          <>
            <img src={headerLogoMobile} alt='' width={86} height={48} />
            <img src={hambuger} alt='' width={44} height={48} />
          </>
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
    </div>
  );
};

export default Header;
