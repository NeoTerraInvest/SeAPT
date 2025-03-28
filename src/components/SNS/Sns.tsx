import { useEffect, useState } from 'react';
import { SnsFrame } from '@components';
import { sns as styles } from '@styles';
import { sns } from '@data';
import { useTrackingView } from '@model';

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
    0: {
      small: 'x-480',
      smallMedium: 'x-767',
      medium: 'x-1024',
      large: 'x-1439',
    },
    1: {
      small: 'telegram-480',
      smallMedium: 'telegram-767',
      medium: 'telegram-1024',
      large: 'telegram-1439',
    },
    2: {
      small: 'youtube-480',
      smallMedium: 'youtube-767',
      medium: 'youtube-1024',
      large: 'youtube-1439',
    },
  };

  return (
    <div className={styles.debug}>
      {sns.data.map((el, index) => {
        return (
          <SnsFrame
            key={index}
            image={imageMap[`${el.id}`]}
            title={el.title}
            description={el.description}
            state={isDescription}
            link={el.linkKey}
          />
        );
      })}
    </div>
  );
};

export default Sns;
