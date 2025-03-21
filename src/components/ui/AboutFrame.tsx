import { useEffect, useState } from 'react';
import { aboutFrame as styles } from '@styles';
import { btnClose } from '@assets';
const AboutFrame = ({
  id,
  title,
  description,
  image,
}: {
  id: string;
  title: string;
  description: string;
  image: { small: string; smallMedium: string; medium: string; large: string };
}) => {
  const [isState, setState] = useState<boolean>(false);

  useEffect(() => {
    console.log(isState);
  }, [isState]);

  return (
    <div id={styles.debug}>
      <picture className={styles.picture}>
        <source srcSet={image.small} media='(max-width: 480px)' />
        <source srcSet={image.smallMedium} media='(max-width: 767px)' />
        <source srcSet={image.medium} media='(max-width: 1024px)' />
        <img id={styles.image} src={image.large} alt={title} loading='lazy' />
      </picture>
      <div className={styles.aboutFrame}>
        <div id={styles.group}>
          {!isState ? <div id={styles.title}>{title}</div> : null}
          {isState ? (
            <div className={styles.description}>
              <div id={styles.group}>
                <div id={styles.title}>{title}</div>
                <div className={styles.contents}>
                  <span>{description}</span>
                  {/* {id === '4' ? (
                    <div
                      style={{ display: 'flex', width: '100%', height: '100%' }}
                    >
                      test
                    </div>
                  ) : null} */}
                </div>
              </div>
              <div id={styles.btn}>
                <button
                  onClick={() => {
                    setState(!isState);
                    console.log(id);
                  }}
                >
                  <img src={btnClose} alt='' width={16} height={16} />
                </button>
              </div>
            </div>
          ) : null}
        </div>
        <div id={styles.layout}>
          {!isState ? (
            <button
              onClick={() => {
                if (id !== '4') {
                  setState(!isState);
                }
              }}
            >
              Details
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AboutFrame;
