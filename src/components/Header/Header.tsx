import { header as styles } from '@styles';
import { headerLogoWeb, headerLogoMobile, hambuger } from '@assets';
import { useTrackingView } from '@model';
import { Translate } from '@components';

const Header = () => {
  const isMobile = useTrackingView({ size: 480 });

  return (
    <div id={styles.debug}>
      <div id={styles.container}>
        <div id={styles.group}>
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
        <div className={styles.tool}>
          <Translate />
        </div>
      </div>
    </div>
  );
};

export default Header;
