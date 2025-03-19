import { tokenFrame as styles } from '@/styles';

const TokenFrame = ({
  title,
  image,
  price,
  description,
}: {
  title: string;
  image: { small: string; smallMedium: string; medium: string; large: string };
  price: string;
  description: string;
}) => {
  return (
    <div id={styles.debug}>
      <div id={styles.image}>
        <picture className={styles.picture}>
          <source srcSet={image.small} media='(max-width: 767px)' />
          <source srcSet={image.smallMedium} media='(max-width: 1024px)' />
          <source srcSet={image.medium} media='(max-width: 1439px)' />
          <img src={image.medium} alt='TokenFrame' loading='lazy' />
        </picture>
      </div>
      <div id={styles.container}>
        <div id={styles.type}>{title}</div>
        <div id={styles.property}>{price}</div>
        <div id={styles.description}>{description}</div>
      </div>
    </div>
  );
};

export default TokenFrame;
