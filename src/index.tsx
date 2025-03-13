import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import App from './App.tsx';
import { ThirdwebProvider, ChainId } from '@thirdweb-dev/react';
const envModeState = import.meta.env.MODE;
{
  if (envModeState === 'development') {
    console.log('🔧Running development mode.');
    import('./index.development.scss');
  } else {
    console.log('🚀Running production mode.');
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThirdwebProvider activeChain={ChainId.Mainnet}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThirdwebProvider>
  </StrictMode>,
);
