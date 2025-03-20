import { roadMapFrame as styles } from '@styles';
import { useTrackingView } from '@model';
import { useEffect } from 'react';

const RoadMapFrame = ({
  phase,
  date,
  title,
  description,
  image,
}: {
  phase: string;
  date: string;
  title: string;
  description: string;
  image: { smallMedium: string; large: string };
}) => {
  const isMobile = useTrackingView();
  useEffect(() => {
    // console.log(isMobile);
  }, [isMobile]);
  return (
    <div id={styles.debug}>
      {isMobile && (
        <div id={styles.imgCol}>
          <picture>
            <source srcSet={image.smallMedium} media='(max-width: 767px)' />
            <img src={image.large} alt='image' loading='lazy' />
          </picture>
        </div>
      )}
      <div id={styles.text}>
        <div id={styles.date}>
          <span id={styles.phase}>{phase}</span>
          <span>{date}</span>
        </div>
        <div id={styles.title}>{title}</div>
        <div id={styles.content}>{description}</div>
      </div>
      {!isMobile && (
        <div id={styles.imgRow}>
          <picture>
            <source srcSet={image.smallMedium} media='(max-width: 767px)' />
            <img src={image.large} alt='image' loading='lazy' />
          </picture>
        </div>
      )}
    </div>
  );
};

export default RoadMapFrame;
