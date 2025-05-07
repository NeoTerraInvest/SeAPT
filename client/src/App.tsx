import { Route, Routes } from 'react-router-dom';
import { Error } from '@components';
import { Main as Home, Dev as Ui, TokenList } from '@pages';
import { useEnvModeState } from '@model';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { useEffect } from 'react';
import { translateKey } from '@types';
import { useTrackingPage } from '@hook';
import News from '@/components/News';
const App = () => {
  useTrackingPage();
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
      <Route path='/TokenList' element={<TokenList />} />
      {isState ? '' : <Route path='/News' element={<News />} />}
      {/* {isState ? '' : <Route path='/Trade' element={<Test />} />} */}
      {/* {isState ? '' : <Route path='/Swap' element={<Test />} />} */}
      <Route path='*' element={<Error />} />
    </Routes>
  );
};

export default App;
