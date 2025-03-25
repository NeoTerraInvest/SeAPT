import { ReactNode, useState } from 'react';
import styles from '@__styles/infinitySlider.module.scss';
const InfinitySlider = ({ children }: { children: ReactNode }) => {
  const [isAnimate] = useState(true);

  // useEffect(() => {
  //   setAnimate(true);
  // }, [isAnimate]);

  return (
    <div className={styles.debug}>
      <div className={styles.slider}>
        <div className={styles.container}>
          <div className={`${isAnimate ? styles.sliderAnim : ''}`}>
            {new Array(2).fill(null).map((_, i) => {
              return (
                <div id={styles.children} key={i}>
                  {children}
                </div>
              );
            })}
          </div>
          <div className={`${isAnimate ? styles.sliderAnim_clone : ''}`}>
            {new Array(2).fill(null).map((_, i) => {
              return (
                <div id={styles.children} key={i}>
                  {children}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfinitySlider;
