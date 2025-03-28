import { tokenFrame as styles } from '@/styles';
import { ReactNode } from 'react';

const CDNURL = import.meta.env.VITE_API_CDN_URL;

const TokenFrame = ({
  title,
  image,
  price,
  description,
}: {
  title: string;
  image: { small: string; smallMedium: string; medium: string; large: string };
  price: string;
  description: ReactNode;
}) => {
  return (
    <div id={styles.debug}>
      <div id={styles.image}>
        <picture className={styles.picture}>
          <source
            srcSet={`${CDNURL}/images/tokenomics/${image.small}.svg`}
            media='(max-width: 767px)'
          />
          <source
            srcSet={`${CDNURL}/images/tokenomics/${image.smallMedium}.svg`}
            media='(max-width: 1024px)'
          />
          <source
            srcSet={`${CDNURL}/images/tokenomics/${image.medium}.svg`}
            media='(max-width: 1439px)'
          />
          <img
            src={`${CDNURL}/images/tokenomics/${image.medium}.svg`}
            alt='TokenFrame'
            loading='lazy'
          />
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
