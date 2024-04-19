import { useState, useEffect } from 'react';
import classes from './Layout.module.scss';
import { sidebarItems } from 'src/utils/SidebarItems';
import Sidebar from '../Sidebar/Sidebar';
import SearchBar from '../SearchBar/SearchBar';

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  return (
    <div className={classes['c-layout']}>
      {token && <Sidebar items={sidebarItems} />}
      <div className={classes['c-layout__content']}>
        <SearchBar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
