import { ReactNode } from 'react';
import { marginLayout as styles } from '@/styles';

const MarginLayout = ({ children }: { children: ReactNode }) => {
  return <div id={styles.layout}> {children}</div>;
};

export default MarginLayout;
