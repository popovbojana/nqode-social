import Friend from 'src/components/Friend/Friend';
import classes from './FriendsPage.module.scss';
import Layout from 'src/components/Layout/Layout';
import { useEffect, useState } from 'react';
import User from 'src/models/User';
import { getAllFriends } from 'src/services/UserService';
import { getUserIdFromToken } from 'src/services/AuthService';

const FriendsPage: React.FC = () => {
  const [friends, setFriends] = useState<User[]>([]);
  const loggedUserId = getUserIdFromToken();

  useEffect(() => {
    getAllFriends(Number.parseInt(loggedUserId ?? ''))
      .then((response) => {
        if (response.status == 200) {
          setFriends(response.data);
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [loggedUserId]);

  return (
    <Layout>
      <div className={`${classes['c-friends-page']}`}>
        <h1>Friends</h1>
        <ul className={`${classes['c-friends-page__friends']}`}>
          {friends.map((friend) => (
            <li className={`${classes['c-friends-page__friend']}`}>
              <Friend key={friend.id} friend={friend} />
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default FriendsPage;
