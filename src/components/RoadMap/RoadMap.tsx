import { ReactNode, useRef } from 'react';
import { roadMap as styles } from '@styles';

const RoadMap = ({ children, num }: { children: ReactNode; num: number }) => {
  const effectRef = useRef<HTMLDivElement>(null);

  const handleInMouse = () => {
    // console.log('Mouse in');
    autoClick();
  };
  const hanldeOutMouse = () => {
    // console.log('Mouse out');
  };
  const autoClick = () => {
    // console.log('Auto Click');
    if (effectRef.current) {
      effectRef.current.click();
    }
  };

  return (
    <div ref={effectRef} className={styles.debug}>
      <div
        ref={effectRef}
        onMouseEnter={handleInMouse}
        onMouseLeave={hanldeOutMouse}
        className={styles.effectLayout}
      >
        <div ref={effectRef} id={styles.effectTop} />
        <div className={styles.container}>
          {new Array(num).fill(null).map((_, i) => {
            return (
              <div key={i} id={styles.contents}>
                {children}
              </div>
            );
          })}
        </div>
        <div
          ref={effectRef}
          onMouseEnter={handleInMouse}
          onMouseLeave={hanldeOutMouse}
          id={styles.effectBottom}
        />
      </div>
    </div>
  );
};

export default RoadMap;
