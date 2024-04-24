import Layout from 'src/components/Layout/Layout';
import classes from './FriendRequestsPage.module.scss';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFriendRequests } from 'src/services/FriendRequestService';
import { getUserIdFromToken } from 'src/services/AuthService';
import FriendRequestData from 'src/models/FriendRequest';
import FriendRequest from 'src/components/FriendRequest/FriendRequest';
import { ArrowDownTrayIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';

const FriendRequestsPage: React.FC = () => {
  const navigate = useNavigate();
  const [friendRequests, setFriendRequests] = useState<FriendRequestData[]>([]);

  const id = getUserIdFromToken();

  useEffect(() => {
    getFriendRequests(id)
      .then((response) => {
        if (response.status == 200) {
          setFriendRequests(response.data);
        }
      })
      .catch((error) => {
        if (error.response.status == 404) {
          navigate('/home');
        }
      });
  }, [friendRequests, id, navigate]);

  return (
    <Layout
      children={
        <div className={`${classes['c-friend-requests-page']}`}>
          <h1>Friend requests</h1>
          <div className={`${classes['c-friend-requests-page__requests']}`}>
            <div className={`${classes['c-friend-requests-page__requests--received']}`}>
              <span className={`${classes['c-friend-requests-page__title']}`}>
                Received <ArrowDownTrayIcon width={25} />
              </span>
              {friendRequests
                .filter((request) => request.toUserId === id)
                .map((request) => (
                  <FriendRequest
                    key={`${request.fromUserId}-${request.toUserId}`}
                    userId={id}
                    friendRequest={request}
                  />
                ))}
            </div>
            <div className={`${classes['c-friend-requests-page__requests--sent']}`}>
              <span className={`${classes['c-friend-requests-page__title']}`}>
                Sent <ArrowUpTrayIcon width={25} />
              </span>
              {friendRequests
                .filter((request) => request.fromUserId === id)
                .map((request) => (
                  <FriendRequest
                    key={`${request.fromUserId}-${request.toUserId}`}
                    userId={id}
                    friendRequest={request}
                  />
                ))}
            </div>
          </div>
        </div>
      }
    />
  );
};

export default FriendRequestsPage;
