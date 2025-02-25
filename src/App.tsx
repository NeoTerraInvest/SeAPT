import { Route, Routes } from 'react-router-dom';
import { Test } from '@components';
import { Main as Home, Dev as Ui } from './pages';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/Ui' element={<Ui />} />
      <Route path='/Trade' element={<Test />} />
      <Route path='/Swap' element={<Test />} />
    </Routes>
  );
};

export default App;
