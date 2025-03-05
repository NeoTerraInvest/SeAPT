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
  containerRow: Error.containerRow,
};

/**
 * ---
 * The **styles** props, CSS types should be applied using the **className**, This components is designed solely for HTML structure and flex layout, not for mediaQuery.
 * @param {object} props
 * @param {ReactNode} props.childern - *necessary
 * @param {number} props.num - *necessary
 * @param {string} props.type - optional / default: 'singleCol' / case: 'singleCol' | 'dobuleCol' | 'singleRow'
 * @param {DefaultStyled} [props.styles=debugStyled] - debugStyled / DefaultStyled from **global.d.ts**
 * @example
 * ```
 * const debugStyled: DefaultStyled = {
 *    debug: Error.debug,
 *    container: Error.container,
 *    element: Error.element,
 *    containerRow: Error.containerRow,
 * };
 * ```
 * @returns {JSX.Element} JSX.Element - `return JSX.Element` can dynamically change `style module` based on the **type** state
 */
const SliderFlex = ({
  children,
  type = 'singleCol',
  num,
  styles = debugStyled,
}: {
  children: ReactNode;
  type?: 'singleCol' | 'dobuleCol' | 'singleRow';
  num: number;
  styles?: DefaultStyled;
}) => {
  let flex;
  switch (type) {
    case 'singleCol':
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
    case 'dobuleCol':
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
    case 'singleRow':
      flex = new Array(num).fill(null).map((_, i) =>
        i !== null ? (
          <div key={i} className={styles.containerRow}>
            <div className={styles.element}>{children}</div>
          </div>
        ) : (
          <span className={styles.debug}>something is wrong</span>
        ),
      );
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
