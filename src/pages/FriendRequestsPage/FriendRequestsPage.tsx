import Layout from 'src/components/Layout/Layout';
import classes from './FriendRequestsPage.module.scss';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FriendRequest from 'src/models/FriendRequest';
import { getPendingFriendRequests } from 'src/services/FriendRequestService';
import { getUserIdFromToken } from 'src/services/AuthService';
import Card from 'src/components/Card/Card';

const FriendRequestsPage: React.FC = () => {
  const navigate = useNavigate();
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);

  const id = getUserIdFromToken();

  useEffect(() => {
    getPendingFriendRequests(id)
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
  }, [id, navigate]);

  return (
    <Layout
      children={
        <div className={`${classes['c-friend-requests-page']}`}>
          {friendRequests &&
            friendRequests.length > 0 &&
            friendRequests.map((request) => {
              return <Card children={<div>{request.status}</div>} />;
            })}
        </div>
      }
    />
  );
};

export default FriendRequestsPage;
