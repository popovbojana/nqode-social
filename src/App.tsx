import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserProfilePage from './pages/UserProfilePage/UserProfilePage';
import UserSettinsPage from './pages/UserSettingsPage/UserSettingsPage';
import HomePage from './pages/HomePage/HomePage';
import FriendRequestsPage from './pages/FriendRequestsPage/FriendRequestsPage';
import FriendsPage from './pages/FriendsPage/FriendsPage';

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
          <Route path='profile/:id' element={<UserProfilePage />} />
          <Route path='settings' element={<UserSettinsPage />} />
          <Route path='home' element={<HomePage />} />
          <Route path='friend-requests' element={<FriendRequestsPage />} />
          <Route path='friends' element={<FriendsPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
