import { header as styles } from '@styles';
import { headerLogoWeb, headerLogoMobile, hambuger } from '@assets';
import { useTrackingView, useModal } from '@model';
import { Translate, MarginLayout, ModalFrame } from '@components';

const Header = () => {
  const isMobile = useTrackingView({ size: 757 });
  // const isLayout = useTrackingView({ size: 1250 });
  const { ModalComponent, openModal } = useModal();

  return (
    <MarginLayout>
      <div id={styles.debug}>
        <div id={styles.container}>
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
      </div>
    </MarginLayout>
  );
};

export default Header;
