import { footer as styles } from '@styles';
import { useTrackingView } from '@model';
import { HashLink } from 'react-router-hash-link';

const CDNURL = import.meta.env.VITE_API_CDN_URL;
const footerLogo = `${CDNURL}/images/footer-logo.svg`;

const Footer = () => {
  const isMobile = useTrackingView();
  const temp = false;
  return (
    <div id={styles.debug}>
      {isMobile ? (
        <HashLink className={styles.contents} smooth to='/#target-show'>
          <img
            src={footerLogo}
            width={120}
            height={48}
            alt='logo'
            loading='lazy'
          />
        </HashLink>
      ) : (
        <div className={styles.contents}>
          <HashLink smooth to='/#target-show'>
            <img
              src={footerLogo}
              width={120}
              height={48}
              alt='logo'
              loading='lazy'
            />
          </HashLink>
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
            <HashLink smooth to='/#target-roadMap'>
              <div>Roadmap</div>
            </HashLink>
            <HashLink smooth to='/#target-about'>
              <div>About</div>
            </HashLink>
            <HashLink smooth to='/#target-tokenomics'>
              <div>Tokenomics</div>
            </HashLink>
            <HashLink smooth to='/#target-sns'>
              <div>Community</div>
            </HashLink>
          </div>
        </div>
        <div className={styles.contents}>
          <div className={styles.title}>{temp ? 'MARKET' : ''}</div>
          <div className={styles.group}>
            <div>{temp ? 'View Chart' : ''}</div>
            <div>{temp ? 'Swap' : ''}</div>
          </div>
        </div>
        <div className={styles.contents}>
          <div className={styles.title}>COMMUNITY</div>
          <div className={styles.group}>
            <div
              onClick={() =>
                window.open(
                  import.meta.env.VITE_LINK_X,
                  '_blank',
                  'noopener,noreferrer',
                )
              }
            >
              X
            </div>
            <div
              onClick={() =>
                window.open(
                  import.meta.env.VITE_LINK_TELEGRAM,
                  '_blank',
                  'noopener,noreferrer',
                )
              }
            >
              Telegram
            </div>
            <div
              onClick={() =>
                window.open(
                  import.meta.env.VITE_LINK_YOUTUBE,
                  '_blank',
                  'noopener,noreferrer',
                )
              }
            >
              Youtube
            </div>
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
