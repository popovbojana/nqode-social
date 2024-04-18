import React from 'react';
import classes from './Sidebar.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/solid';

interface SidebarProps {
  items: { icon: JSX.Element; name: string; path: string }[];
}

const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (itemPath: string) => {
    return location.pathname === itemPath ? classes['c-sidebar__link--active'] : '';
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className={`${classes['c-sidebar']}`}>
      <div>
        <h1 className={`${classes['c-sidebar__title']}`}>nQode Social Network</h1>
        {items.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`${classes['c-sidebar__link']} ${isActive(item.path)}`}
          >
            <span className={`${classes['c-sidebar__icon']}`}>{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </div>

      <div>
        <Link to='/profile' className={`${classes['c-sidebar__link']} ${isActive('/profile')}`}>
          <UserIcon className={`${classes['c-sidebar__icon']}`} />
          <span>Profile</span>
        </Link>
        <div onClick={handleLogout} className={`${classes['c-sidebar__link']}`}>
          <ArrowRightStartOnRectangleIcon className={`${classes['c-sidebar__icon']}`} />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
