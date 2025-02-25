import { Route, Routes } from 'react-router-dom';
import { Test } from '@components';
import { Main as Home } from './pages';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/test' element={<Test />} />
    </Routes>
  );
};

export default App;
