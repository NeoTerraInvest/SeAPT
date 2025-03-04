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
 * ---
 * CSS types for the **styles** props should use the **className**
 * @param {object} props
 * @param {ReactNode} props.childern - *necessary
 * @param {number} props.num - *necessary
 * @param {boolean} props.type - optional / default: true
 * @param {DefaultStyled} [props.styles=debugStyled] - debugStyled / DefaultStyled from **global.d.ts**
 * @example
 * ```
 * const debugStyled: DefaultStyled = {
 *    debug: Error.debug,
 *    container: Error.container,
 *    element: Error.element,
 * };
 * ```
 * @returns {JSX.Element} JSX.Element - `return JSX.Element` can dynamically change `style module` based on the **type** state
 */
const SliderFlex = ({
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
        ? //sigle col
          new Array(num).fill(null).map((_, i) =>
            i !== null ? (
              <div key={i} className={styles.container}>
                <div className={styles.element}>{children}</div>
              </div>
            ) : (
              <span className={styles.debug}>something is wrong</span>
            ),
          )
        : //dobule col
          new Array(num).fill(null).map((_, i) =>
            i !== null ? (
              i % 2 === 0 ? (
                <div key={i} className={styles.container}>
                  <div className={styles.element}>{children}</div>
                  <div className={styles.element}>{children}</div>
                </div>
              ) : null
            ) : (
              <span className={styles.debug}>something is wrong</span>
            ),
          )}
    </section>
  );
};

export default SliderFlex;
