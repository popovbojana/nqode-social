import { Route, Routes } from 'react-router-dom';
import classes from './App.module.scss';
import LoginPage from './pages/LoginPage/LoginPage';

const App = () => {
  return (
    <div className={classes['c-app']}>
      <Routes>
        <Route element={<LoginPage />} path='' />
        <Route element={<LoginPage />} path='/login' />
      </Routes>
    </div>
  );
};

export default App;
