import { useEffect, useState } from 'react';

const useTrackingView = (target?: { size: number }): boolean => {
  //use to Nullish coalescing Operator
  const viewSize = target?.size ?? 768;
  const [isTracking, setTraking] = useState<boolean>(
    window.innerWidth <= viewSize,
  );

  useEffect(() => {
    const handleResizeView = () => {
      const traingState = window.innerWidth <= viewSize;
      setTraking(traingState);
    };

    window.addEventListener('resize', handleResizeView);
    return () => window.removeEventListener('resize', handleResizeView);
  }, [viewSize]);

  return isTracking;
};

export default useTrackingView;
