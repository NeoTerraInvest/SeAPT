import { useEffect, useState } from 'react';
import { SnsFrame } from '@components';
import { sns as styles } from '@styles';
import { sns } from '@data';
import { useTrackingView } from '@model';
import {
  telegram340,
  telegram481,
  telegram768,
  telegram1025,
  x340,
  x481,
  x768,
  x1025,
  youtube340,
  youtube481,
  youtube768,
  youtube1025,
} from '@assets';

const Sns = () => {
  const isMobile1025 = useTrackingView({ size: 1439 });
  const isMobile768 = useTrackingView({ size: 1024 });
  const isMobile481 = useTrackingView({ size: 767 });
  const isMobile340 = useTrackingView({ size: 480 });
  const isMobileMin = useTrackingView({ size: 340 });

  const [isImage, setImage] = useState<string[]>([
    x1025,
    telegram1025,
    youtube1025,
  ]);
  const [isDescription, setDescription] = useState<boolean>(
    isMobile481 || isMobile340 || isMobileMin ? true : false,
  );

  useEffect(() => {
    const sizeMap: Record<number, string[]> = {
      1025: [x1025, telegram1025, youtube1025],
      768: [x768, telegram768, youtube768],
      481: [x481, telegram481, youtube481],
      340: [x340, telegram340, youtube340],
    };

    setDescription(isMobile481 || isMobile340 || isMobileMin ? true : false);

    let state = 1025; // 기본값
    if (isMobile1025) {
      state = 1025;
    }
    if (isMobile768) {
      state = 768;
    }
    if (isMobile481) {
      state = 481;
    }
    if (isMobile340) {
      state = 340;
    }
    console.log(`state: ${state}`, `selected images:`, sizeMap[state]);
    setImage(sizeMap[state]);
  }, [isMobile1025, isMobile768, isMobile481, isMobile340, isMobileMin]);

  return (
    <div className={styles.debug}>
      {sns.data.map((el, index) => {
        return (
          <SnsFrame
            key={index}
            image={isImage[index]}
            title={el.title}
            description={el.description}
            state={isDescription}
          />
        );
      })}
    </div>
  );
};

export default Sns;
