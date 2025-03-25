import { Route, Routes } from 'react-router-dom';
import { Test, Error } from '@components';
import { Main as Home, Dev as Ui } from './pages';
import { useEnvModeState } from '@model';

const App = () => {
  const isState = useEnvModeState();
  console.log(
    `Called App: ${isState ? 'production-' : 'development-'}${isState}`,
  );

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      {isState ? '' : <Route path='/Ui' element={<Ui />} />}
      {isState ? '' : <Route path='/Trade' element={<Test />} />}
      {isState ? '' : <Route path='/Swap' element={<Test />} />}
      <Route path='*' element={<Error />} />
    </Routes>
  );
};

export default App;
