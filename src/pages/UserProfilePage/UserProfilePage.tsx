import { UserCircleIcon } from '@heroicons/react/24/solid';
import classes from './UserProfilePage.module.scss';
import { getUser } from 'src/services/UserService';
import Layout from 'src/components/Layout/Layout';
import { useEffect, useState } from 'react';
import User from 'src/models/User';
import { useNavigate, useParams } from 'react-router-dom';

const UserProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const { id } = useParams();

  useEffect(() => {
    getUser(Number.parseInt(id ?? ''))
      .then((response) => {
        if (response.status == 200) {
          setUser(response.data);
        }
      })
      .catch((error) => {
        if (error.response.status == 404) {
          navigate('/home');
        }
      });
  }, [id, navigate]);

  return (
    <Layout
      children={
        <div className={`${classes['c-user-profile-page']}`}>
          <div className={`${classes['c-user-profile-page__header']}`}>
            <div className={`${classes['c-user-profile-page__photo']}`}>
              <UserCircleIcon />
            </div>
            <div className={`${classes['c-user-profile-page__data']}`}>
              <div className={`${classes['c-user-profile-page__text']}`}>
                {user?.username && (
                  <span className={`${classes['c-user-profile-page__text--important']}`}>
                    {`@${user.username}`}
                  </span>
                )}
                <span>
                  {user?.firstName} {user?.lastName}
                </span>
              </div>
              <div className={`${classes['c-user-profile-page__text']}`}>
                <span className={`${classes['c-user-profile-page__text--important']}`}>
                  {user?.postsCount}
                </span>
                <span>posts</span>
              </div>
              <div className={`${classes['c-user-profile-page__text']}`}>
                <span className={`${classes['c-user-profile-page__text--important']}`}>
                  {user?.friendsCount}
                </span>
                <span>friends</span>
              </div>
            </div>
          </div>
          <div className={`${classes['c-user-profile-page__posts']}`}></div>
        </div>
      }
    />
  );
};

export default UserProfilePage;
