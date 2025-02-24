import { Route, Routes } from 'react-router-dom';
import Test from './components/Test/Test';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<div>Home</div>} />
      <Route path='/test' element={<Test />} />
    </Routes>
  );
};

export default App;
