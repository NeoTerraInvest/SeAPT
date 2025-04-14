import { snsFrame as styles } from '@styles';
import { linkMap, linkKey } from '@types';

const CDNURL = import.meta.env.VITE_API_CDN_URL;

const SnsFrame = ({
  image,
  title,
  description,
  state,
  link,
}: {
  image: { small: string; smallMedium: string; medium: string; large: string };
  title: string;
  description: string;
  state: boolean;
  link: linkKey;
}) => {
  const handleClick = () => {
    const fixedLink = linkMap[link];
    if (fixedLink) {
      window.open(fixedLink, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div id={styles.debug} onClick={handleClick}>
      <div className={styles.container}>
        <div id={styles.hyperlink}>
          <div></div>
        </div>
        <div className={styles.contents}>
          <div id={styles.img}>
            <picture>
              <source
                srcSet={`${CDNURL}/images/sns/${image.small}.svg`}
                media='(max-width: 480px)'
              />
              <source
                srcSet={`${CDNURL}/images/sns/${image.smallMedium}.svg`}
                media='(max-width: 767px)'
              />
              <source
                srcSet={`${CDNURL}/images/sns/${image.medium}.svg`}
                media='(max-width: 1024px)'
              />
              {/* <source srcSet={image.large} media='(max-width: 1439px)' /> */}
              <img
                src={`${CDNURL}/images/sns/${image.large}.svg`}
                alt={title}
                loading='lazy'
              />
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
