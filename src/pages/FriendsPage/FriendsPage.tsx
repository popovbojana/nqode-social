import Friend from 'src/components/Friend/Friend';
import classes from './FriendsPage.module.scss';
import Layout from 'src/components/Layout/Layout';
import { useEffect, useState } from 'react';
import User from 'src/models/User';
import { getAllFriends } from 'src/services/UserService';
import { getUserIdFromToken } from 'src/services/AuthService';
import noFriends from 'src/assets/images/no-friends.svg';

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
      {friends.length > 0 ? (
        <div className={`${classes['c-friends-page']}`}>
          <h1>Friends</h1>
          <ul className={`${classes['c-friends-page__friends']}`}>
            {friends
              .map((friend) => (
                <li className={`${classes['c-friends-page__friend']}`}>
                  <Friend key={friend.id} friend={friend} />
                </li>
              ))
              .reverse()}
          </ul>
        </div>
      ) : (
        <div className={`${classes['c-friends-page__no-friends']}`}>
          <div className={`${classes['c-friends-page__no-friends-text']}`}>No friends yet.</div>
          <img src={noFriends} className={`${classes['c-friends-page__no-friends-img']}`} />
        </div>
      )}
    </Layout>
  );
};

export default FriendsPage;
