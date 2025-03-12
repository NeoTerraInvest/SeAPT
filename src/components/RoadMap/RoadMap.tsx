import { ReactNode } from 'react';
import { roadMap as styles } from '@styles';

const RoadMap = ({ children, num }: { children: ReactNode; num: number }) => {
  // const containerRef = useRef<HTMLDivElement>(null);

  // const handleInMouse = () => {
  //   console.log('Mouse in');
  //   autoClick();
  // };
  // const hanldeOutMouse = () => {
  //   console.log('Mouse out');
  // };
  // const autoClick = () => {
  //   console.log('Auto Click');
  //   if (containerRef.current) {
  //     containerRef.current.click();
  //   }
  // };

  return (
    <div
      // ref={containerRef}
      className={styles.debug}
      // onMouseEnter={handleInMouse}
      // onMouseLeave={hanldeOutMouse}
    >
      <div className={styles.effectLayout}>
        <div id={styles.effectTop} />
        <div className={styles.container}>
          {new Array(num).fill(null).map((_, i) => {
            return (
              <div key={i} id={styles.contents}>
                {children}
              </div>
            );
          })}
        </div>
        <div id={styles.effectBottom} />
      </div>
    </div>
  );
};

export default RoadMap;
