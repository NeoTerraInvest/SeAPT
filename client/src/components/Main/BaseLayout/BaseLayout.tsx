import { ReactNode } from 'react';
import { Header, Footer } from '@components';
// import { baseLayout as gideLine } from '@styles';

const BaseLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default BaseLayout;
