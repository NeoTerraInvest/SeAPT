import { useEffect, useState } from 'react';
import { aboutFrame as styles } from '@styles';
import { btnClose } from '@assets';
import { HashLink } from 'react-router-hash-link';

const CDNURL = import.meta.env.VITE_API_CDN_URL;

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
        <source
          srcSet={`${CDNURL}/images/about/${image.small}.svg`}
          media='(max-width: 480px)'
        />
        <source
          srcSet={`${CDNURL}/images/about/${image.smallMedium}.svg`}
          media='(max-width: 767px)'
        />
        <source
          srcSet={`${CDNURL}/images/about/${image.medium}.svg`}
          media='(max-width: 1024px)'
        />
        <img
          id={styles.image}
          src={`${CDNURL}/images/about/${image.large}.svg`}
          alt={title}
          loading='lazy'
        />
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
                    if (id !== '0') {
                      setState(!isState);
                      console.log(id);
                    } else {
                      window.open(
                        import.meta.env.VITE_LINK_GAME,
                        '_blank',
                        'noopener,noreferrer',
                      );
                      window.location.reload();
                    }
                  }}
                >
                  {id !== '0' ? (
                    <img src={btnClose} alt='' width={16} height={16} />
                  ) : (
                    <span>Enjoy!</span>
                  )}
                </button>
              </div>
            </div>
          ) : null}
        </div>
        <div id={styles.layout}>
          {!isState ? (
            <HashLink smooth to={id !== '4' ? '' : '/#target-whitepaper'}>
              <button
                onClick={() => {
                  if (id !== '4') {
                    setState(!isState);
                  }
                }}
              >
                Details
              </button>
            </HashLink>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AboutFrame;
