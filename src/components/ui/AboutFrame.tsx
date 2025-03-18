import { aboutFrame as styles } from '@styles';

const AboutFrame = ({
  title,
  image,
}: {
  title: string;
  image: { small: string; smallMedium: string; medium: string; large: string };
}) => {
  return (
    <div id={styles.debug}>
      <picture className={styles.picture}>
        <source srcSet={image.small} media='(max-width: 480px)' />
        <source srcSet={image.smallMedium} media='(max-width: 767px)' />
        <source srcSet={image.medium} media='(max-width: 1024px)' />
        <img id={styles.image} src={image.large} alt={title} />
      </picture>
      <div id={styles.aboutFrame}>
        <div id={styles.group}>
          <div id={styles.title}>{title}</div>
          <div id={styles.description}>
            {/* <div>body_sm</div>
            <div>body_sm</div> */}
          </div>
        </div>
        <div id={styles.layout}>
          <button>Details</button>
        </div>
      </div>
    </div>
  );
};

export default AboutFrame;
