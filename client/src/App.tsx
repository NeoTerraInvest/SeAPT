import { Route, Routes } from 'react-router-dom';
import { DexList, DexChart, Error } from '@components';
import { Main as Home, Dev as Ui } from './pages';
import { useEnvModeState } from '@model';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { useEffect } from 'react';
import { translateKey } from '@types';

const App = () => {
  const isState = useEnvModeState();
  const isMobileDomain = window.location.hostname.startsWith('m.');
  console.log(
    `Called App: ${isState ? 'production-' : 'development-'}${isState}`,
  );
  const language = useSelector(
    (state: RootState) => state.translate.language,
  ) as translateKey;
  
  useEffect(() => {
    console.log(isMobileDomain);
  }, [isMobileDomain]);

  return (
    <Routes>
      <Route path='/' element={<Home translate={language} />} />
      {isState ? '' : <Route path='/Ui' element={<Ui />} />}
      {isState ? '' : <Route path='/DexList' element={<DexList />} />}
      {isState ? '' : <Route path='/DexStock/:pairId' element={<DexChart />} />}
      {isState ? '' : <Route path='/Swap' element={<Error />} />}
      <Route path='*' element={<Error />} />
    </Routes>
  );
};

export default App;
