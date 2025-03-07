import { useEffect, useState } from 'react';

const useTrackingView = (): boolean => {
  const [isTracking, setTraking] = useState<boolean>(window.innerWidth <= 768);

  useEffect(() => {
    const handleResizeView = () => {
      const traingState = window.innerWidth <= 768;
      setTraking(traingState);
    };

    window.addEventListener('resize', handleResizeView);
    return () => window.removeEventListener('resize', handleResizeView);
  }, []);

  return isTracking;
};

export default useTrackingView;
