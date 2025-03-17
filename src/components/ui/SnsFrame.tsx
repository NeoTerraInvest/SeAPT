import { useEffect, useState } from 'react';
import { snsFrame as styles } from '@styles';
import { useTrackingView } from '@model';
import {
  // telegram340,
  // telegram481,
  // telegram768,
  // telegram1025,
  // x340,
  // x481,
  // x768,
  // x1025,
  youtube340,
  youtube481,
  youtube768,
  youtube1025,
} from '@assets';

const SnsFrame = () => {
  const isMobile1025 = useTrackingView({ size: 1439 });
  const isMobile768 = useTrackingView({ size: 1024 });
  const isMobile481 = useTrackingView({ size: 767 });
  const isMobile340 = useTrackingView({ size: 480 });
  const isMobileMin = useTrackingView({ size: 340 });

  const [isImage, setImage] = useState<string>();

  useEffect(() => {
    if (isMobile1025) {
      setImage(youtube1025);
    }
    if (isMobile768) {
      setImage(youtube768);
    }
    if (isMobile481) {
      setImage(youtube481);
    }
    if (isMobile340) {
      setImage(youtube340);
    }
  }, [isMobile1025, isMobile768, isMobile481, isMobile340]);

  return (
    <div id={styles.debug}>
      <div className={styles.container}>
        <div id={styles.hyperlink}>
          <div></div>
        </div>
        <div className={styles.contents}>
          <div id={styles.img}>
            <img src={isImage} alt='' />
          </div>
          <div id={styles.title}>title</div>
          {isMobile481 || isMobile340 || isMobileMin ? null : (
            <div id={styles.description}>description</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SnsFrame;
