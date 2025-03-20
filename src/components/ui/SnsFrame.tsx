import { snsFrame as styles } from '@styles';

const SnsFrame = ({
  image,
  title,
  description,
  state,
}: {
  image: { small: string; smallMedium: string; medium: string; large: string };
  title: string;
  description: string;
  state: boolean;
}) => {
  return (
    <div id={styles.debug}>
      <div className={styles.container}>
        <div id={styles.hyperlink}>
          <div></div>
        </div>
        <div className={styles.contents}>
          <div id={styles.img}>
            <picture>
              <source srcSet={image.small} media='(max-width: 480px)' />
              <source srcSet={image.smallMedium} media='(max-width: 767px)' />
              <source srcSet={image.medium} media='(max-width: 1024px)' />
              {/* <source srcSet={image.large} media='(max-width: 1439px)' /> */}
              <img src={image.large} alt={title} loading='lazy' />
            </picture>
          </div>
          <div id={styles.title}>{title}</div>
          {state ? null : <div id={styles.description}>{description}</div>}
        </div>
      </div>
    </div>
  );
};

export default SnsFrame;
