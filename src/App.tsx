import { Route, Routes } from 'react-router-dom';
import classes from './App.module.scss';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';

const App = () => {
  return (
    <div className={classes['c-app']}>
      <Routes>
        <Route element={<LoginPage />} path='' />
        <Route element={<LoginPage />} path='/login' />
        <Route element={<RegistrationPage />} path='/registration' />
      </Routes>
    </div>
  );
};

export default App;
