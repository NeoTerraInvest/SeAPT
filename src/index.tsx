import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './store';
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
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
