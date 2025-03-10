import { Error } from '@styles';
import { ReactNode } from 'react';
import { DefaultStyled } from '@types';
import { Slider } from '@model';

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
 * `SliderFlex` is can control the creation of either a single line or a double line or slider type.
 * ⚠️ the object's flex controller should be handled within the object's CSS.
 * CSS types for the **styles** props should use the **className**
 * @param {object} props
 * @param {ReactNode} props.childern - *necessary
 * @param {number} props.num - *necessary
 * @param {string} props.type - optional / default: 'single' / case: 'single' | 'dobule' | 'singleSlider'
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
  type = 'single',
  num,
  styles = debugStyled,
}: {
  children: ReactNode;
  type?: 'single' | 'dobule' | 'singleSlider';
  num: number;
  styles?: DefaultStyled;
}) => {
  let flex;
  switch (type) {
    case 'single':
      flex = new Array(num).fill(null).map((_, i) =>
        i !== null ? (
          <div key={i} className={styles.container}>
            <div className={styles.element}>{children}</div>
          </div>
        ) : (
          <span className={styles.debug}>something is wrong</span>
        ),
      );
      break;

    case 'dobule':
      flex = new Array(num).fill(null).map((_, i) =>
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
      );
      break;

    case 'singleSlider':
      flex = <Slider>{children}</Slider>;
      break;

    default:
      flex = (
        <span className={styles.debug}>
          ⚠️ Unsupported type: <strong>{type}</strong>
        </span>
      );
  }
  return <section className={styles.debug}>{flex}</section>;
};

export default SliderFlex;
