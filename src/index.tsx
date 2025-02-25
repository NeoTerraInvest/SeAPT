import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import App from './App.tsx';
import { ThirdwebProvider, ChainId } from '@thirdweb-dev/react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThirdwebProvider activeChain={ChainId.Mainnet}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThirdwebProvider>
  </StrictMode>,
);
