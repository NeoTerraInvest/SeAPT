import { useEffect, useState } from 'react';

const envModeState = import.meta.env.MODE;

const useEnvModeState = (): boolean => {
  const [isState, setState] = useState<boolean>(envModeState !== 'development');

  useEffect(() => {
    if (envModeState === 'development') {
      //   console.log('🔧Running development mode.');
      setState(false);
    } else {
      //   console.log('🚀Running production mode.');
      setState(true);
    }
  }, []);

  return isState;
};

export default useEnvModeState;
