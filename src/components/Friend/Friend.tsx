import User from 'src/models/User';
import Card from '../Card/Card';
import { useNavigate } from 'react-router-dom';
import classes from './Friend.module.scss';
import { UserCircleIcon } from '@heroicons/react/24/solid';

interface FriendProps {
  friend: User;
}

const Friend: React.FC<FriendProps> = ({ friend }) => {
  const navigate = useNavigate();
  const handleNavigateToProfile = () => {
    navigate(`/profile/${friend.id}`);
  };

  return (
    <div className={`${classes['c-friend']}`} onClick={handleNavigateToProfile}>
      <Card variant='friend-request'>
        <div className={`${classes['c-friend__user-data']}`}>
          <div className={`${classes['c-friend__icon']}`}>
            <UserCircleIcon />
          </div>
          <div className={`${classes['c-friend__text']}`}>
            <div className={`${classes['c-friend__text--important']}`}>
              <i>@{friend.username}</i>
            </div>
            <div>
              {friend.firstName} {friend.lastName}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Friend;
