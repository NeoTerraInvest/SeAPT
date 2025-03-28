import { footer as styles } from '@styles';
// import { footerLogo } from '@assets';
import { useTrackingView } from '@model';

const CDNURL = import.meta.env.VITE_API_CDN_URL;
const footerLogo = `${CDNURL}/images/footer-logo.svg`;

const Footer = () => {
  const isMobile = useTrackingView();

  return (
    <div id={styles.debug}>
      {isMobile ? (
        <div className={styles.contents}>
          <img
            src={footerLogo}
            width={120}
            height={48}
            alt='logo'
            loading='lazy'
          />
        </div>
      ) : (
        <div className={styles.contents}>
          <img
            src={footerLogo}
            width={120}
            height={48}
            alt='logo'
            loading='lazy'
          />
          <div className={styles.information}>
            <div id={styles.info}>contact : neoterrafund@gmail.com</div>
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
            <div id={styles.info}>contact : neoterrafund@gmail.com</div>
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
