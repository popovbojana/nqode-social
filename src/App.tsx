import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserProfilePage from './pages/UserProfilePage/UserProfilePage';

const App = () => {
  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme='light'
      />
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/registration' element={<RegistrationPage />} />
        <Route path='/' element={<ProtectedRoute />}>
          <Route element={<UserProfilePage />} path='profile/:id' />
        </Route>
      </Routes>
    </>
  );
};

export default App;
