import { useEffect, useState } from 'react';
import { SnsFrame } from '@components';
import { sns as styles } from '@styles';
import { sns } from '@data';
import { useTrackingView } from '@model';
import {
  telegram480,
  telegram767,
  telegram1024,
  telegram1439,
  x480,
  x767,
  x1024,
  x1439,
  youtube480,
  youtube767,
  youtube1024,
  youtube1439,
} from '@assets';

const Sns = () => {
  const isMobile1439 = useTrackingView({ size: 1439 });
  const isMobile1024 = useTrackingView({ size: 1024 });
  const isMobile767 = useTrackingView({ size: 767 });
  const isMobile480 = useTrackingView({ size: 480 });
  const isMobile340 = useTrackingView({ size: 340 });

  const [isDescription, setDescription] = useState<boolean>(
    isMobile767 || isMobile480 || isMobile340 ? true : false,
  );

  useEffect(() => {
    setDescription(isMobile767 || isMobile480 || isMobile340 ? true : false);
  }, [isMobile1439, isMobile1024, isMobile767, isMobile480, isMobile340]);

  const imageMap: Record<
    string,
    { small: string; smallMedium: string; medium: string; large: string }
  > = {
    x: {
      small: x480,
      smallMedium: x767,
      medium: x1024,
      large: x1439,
    },
    telegram: {
      small: telegram480,
      smallMedium: telegram767,
      medium: telegram1024,
      large: telegram1439,
    },
    youtube: {
      small: youtube480,
      smallMedium: youtube767,
      medium: youtube1024,
      large: youtube1439,
    },
  };

  return (
    <div className={styles.debug}>
      {sns.data.map((el, index) => {
        const lowerCaseTitle = el.title.toLowerCase();
        console.log(lowerCaseTitle);
        return (
          <SnsFrame
            key={index}
            image={imageMap[`${el.title.toLowerCase()}`]}
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
