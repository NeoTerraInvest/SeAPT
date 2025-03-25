import { ReactNode } from 'react';
import { marginLayout as styles } from '@/styles';

/**
 * ---
 * The `single` parameter can check both or left margin
 *
 * @param {object} props
 * @param {ReactNode} props.children
 * @param {boolean} props.single  - optional / default: false
 * @returns {JSX.Element} JSX.Element - `return JSX.Element` can dynamically change `style module` based on the **single** state
 */
const MarginLayout = ({
  children,
  auto = true,
}: {
  children: ReactNode;
  auto?: boolean;
}) => {
  return auto ? (
    <div id={styles.layout}> {children}</div>
  ) : (
    <div id={styles.singleLeft}> {children}</div>
  );
};

export default MarginLayout;
