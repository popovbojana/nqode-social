import Card from '../Card/Card';
import classes from './FriendRequest.module.scss';
import User from 'src/models/User';
import { useEffect, useState } from 'react';
import { getUser } from 'src/services/UserService';
import FriendRequestData from 'src/models/FriendRequest';
import { QuestionMarkCircleIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import Button from '../core/Button/Button';
import { respondToFriendRequest } from 'src/services/FriendRequestService';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

interface FriendRequestProps {
  userId: number;
  friendRequest: FriendRequestData;
}

const FriendRequest: React.FC<FriendRequestProps> = ({ userId, friendRequest }) => {
  const [fromUser, setFromUser] = useState<User>();
  const [toUser, setToUser] = useState<User>();

  useEffect(() => {
    getUser(friendRequest.fromUserId).then((response) => {
      setFromUser(response.data);
    });
    getUser(friendRequest.toUserId).then((response) => {
      setToUser(response.data);
    });
  }, [friendRequest.fromUserId, friendRequest.toUserId]);

  const handleAcceptOnClick = () => {
    respondToFriendRequest(friendRequest.fromUserId, friendRequest.toUserId, 'ACCEPTED').then(
      () => {
        toast.success(`Accepted friend request from ${fromUser?.username}!`);
      }
    );
  };

  const handleDeclineOnClick = () => {
    respondToFriendRequest(friendRequest.fromUserId, friendRequest.toUserId, 'REJECTED').then(
      () => {
        toast.info(`Rejected friend request from ${fromUser?.username}!`);
      }
    );
  };

  return (
    <div className={`${classes['c-friend-request']}`}>
      <Card variant='friend-request'>
        <div className={`${classes['c-friend-request__data']}`}>
          {userId === friendRequest.fromUserId && (
            <div className={`${classes['c-friend-request__text']}`}>
              <span className={`${classes['c-friend-request__text--important']}`}>TO</span>
              <span>
                <Link to={`/profile/${friendRequest.toUserId}`}>
                  <i>{toUser?.username}</i>
                </Link>
              </span>
            </div>
          )}
          {userId === friendRequest.toUserId && (
            <div className={`${classes['c-friend-request__text']}`}>
              <span className={`${classes['c-friend-request__text--important']}`}>FROM</span>
              <span>
                <Link to={`/profile/${friendRequest.fromUserId}`}>
                  <i>{fromUser?.username}</i>
                </Link>
              </span>
            </div>
          )}
          <div className={`${classes['c-friend-request__text']}`}>
            <span className={`${classes['c-friend-request__text--important']}`}>STATUS</span>
            <div className={`${classes['c-friend-request__icon']}`}>
              {friendRequest.status === 'PENDING' && (
                <div>
                  <QuestionMarkCircleIcon />
                </div>
              )}
              {friendRequest.status === 'ACCEPTED' && (
                <div className={`${classes['c-friend-request__icon--accepted']}`}>
                  <CheckCircleIcon />
                </div>
              )}
              {friendRequest.status === 'REJECTED' && (
                <div className={`${classes['c-friend-request__icon--rejected']}`}>
                  <XCircleIcon />
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
      {userId === friendRequest.toUserId && friendRequest.status === 'PENDING' && (
        <Card variant='friend-request'>
          <Button label='Accept' onClick={handleAcceptOnClick} />
          <Button label='Reject' onClick={handleDeclineOnClick} />
        </Card>
      )}
    </div>
  );
};

export default FriendRequest;
