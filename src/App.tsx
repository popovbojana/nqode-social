import { Route, Routes } from 'react-router-dom';
import classes from './App.module.scss';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import Sidebar from './components/Sidebar/Sidebar';
import { sidebarItems } from './utils/SidebarItems';

const App = () => {
  // TODO: after login is finished check if user is logged in (if it isn't remove sidebar and move paths for login and registration)
  return (
    <div className={classes['c-app']}>
      <Sidebar items={sidebarItems} />
      <div className={classes['c-app__content']}>
        <Routes>
          <Route element={<LoginPage />} path='' />
          <Route element={<LoginPage />} path='/login' />
          <Route element={<RegistrationPage />} path='/registration' />
        </Routes>
      </div>
    </div>
  );
};

export default App;
