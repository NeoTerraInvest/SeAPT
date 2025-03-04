import { Error } from '@styles';
import { ReactNode } from 'react';
import { DefaultStyled } from '@types';

/**
 * default Styled props
 */
const debugStyled: DefaultStyled = {
  debug: Error.debug,
  container: Error.container,
  element: Error.element,
};

/**
 * styles css types of the props should use the className
 * childern : necessary
 * num : necessary
 * type : default true
 * styles : default object
 */
const Slider = ({
  children,
  type = true,
  num,
  styles = debugStyled,
}: {
  children: ReactNode;
  type?: boolean;
  num: number;
  styles?: DefaultStyled;
}) => {
  return (
    <section className={styles.debug}>
      {type
        ? new Array(num).fill(null).map((_, i) =>
            i !== null ? (
              <div key={i} className={styles.container}>
                <div className={styles.element}>{children}</div>
              </div>
            ) : (
              <span className={styles.debug}>something is wrong</span>
            ),
          )
        : new Array(num).fill(null).map((_, i) =>
            i % 2 === 0 ? (
              <div key={i} className={styles.container}>
                <div className={styles.element}>{children}</div>
                <div className={styles.element}>{children}</div>
              </div>
            ) : (
              <span className={styles.debug}>something is wrong</span>
            ),
          )}
    </section>
  );
};

export default Slider;
