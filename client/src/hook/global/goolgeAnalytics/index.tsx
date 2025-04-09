// 예시: App.tsx 또는 Layout 컴포넌트에서
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useTrackingPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (!window.gtag) return;
    window.gtag('config', 'G-M4DW6YNFWB', {
      page_path: location.pathname,
    });
  }, [location]);
};

export default useTrackingPage;
