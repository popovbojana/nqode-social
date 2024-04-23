import { UserCircleIcon } from '@heroicons/react/24/solid';
import classes from './UserProfilePage.module.scss';
import { getUser } from 'src/services/UserService';
import Layout from 'src/components/Layout/Layout';
import { useEffect, useState } from 'react';
import User from 'src/models/User';
import PostData from 'src/models/Post';
import { useNavigate, useParams } from 'react-router-dom';
import Post from 'src/components/Post/Post';
import { getPosts } from 'src/services/PostService';
import Button from 'src/components/core/Button/Button';
import { getUserIdFromToken } from 'src/services/AuthService';
import { createFriendRequest, getFriendRequest } from 'src/services/FriendRequestService';
import { toast } from 'react-toastify';
import FriendRequestData from 'src/models/FriendRequest';

const UserProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const [posts, setPosts] = useState<PostData[]>([]);
  const [buttonLabel, setButtonLabel] = useState('Waiting for response');
  const { id } = useParams();
  const [loggedUserId, setLoggedUserId] = useState();
  const [friendRequest, setFriendRequest] = useState<FriendRequestData | null>(null);

  useEffect(() => {
    getUser(Number.parseInt(id ?? ''))
      .then((response) => {
        if (response.status == 200) {
          setUser(response.data);
          setLoggedUserId(getUserIdFromToken());
        }
      })
      .catch((error) => {
        if (error.response.status == 404) {
          navigate('/home');
        }
      });
    getPosts(Number.parseInt(id ?? '')).then((response) => {
      setPosts(response.data);
    });
  }, [id, navigate]);

  const handleAddFriend = () => {
    createFriendRequest(loggedUserId!, Number.parseInt(id ?? '')).then((response) => {
      if (response.status === 201) {
        setFriendRequest(response.data);
        setButtonLabel('Waiting for response');
        toast.success(`Successfully sent friend request to ${user?.username}!`);
      }
    });
  };

  useEffect(() => {
    getFriendRequest(loggedUserId ?? -1, user?.id ?? -1)
      .then((response) => {
        setFriendRequest(response.data);
        if (response.data.status === 'ACCEPTED') {
          setButtonLabel('Friends');
        } else if (response.data.status === 'REJECTED') {
          setButtonLabel('Request rejected');
        }
      })
      .catch((error) => {
        if (error.response.status == 404) {
          setFriendRequest(null);
        }
      });
  }, [loggedUserId, user]);

  return (
    <Layout>
      <div className={`${classes['c-user-profile-page']}`}>
        <div className={`${classes['c-user-profile-page__header']}`}>
          <div className={`${classes['c-user-profile-page__photo']}`}>
            <UserCircleIcon />
          </div>
          <div className={`${classes['c-user-profile-page__data']}`}>
            <div className={`${classes['c-user-profile-page__text']}`}>
              {user?.username && (
                <span className={`${classes['c-user-profile-page__text--important']}`}>
                  <i>{`@${user.username}`}</i>
                </span>
              )}
              <span>
                {user?.firstName} {user?.lastName}
              </span>

              {friendRequest ? (
                <>
                  <span className={`${classes['c-user-profile-page__text--request-info']}`}>
                    <Button label={buttonLabel} variant='disabled' />
                  </span>
                </>
              ) : (
                loggedUserId != user?.id && (
                  <Button label='Send friend request' onClick={handleAddFriend} />
                )
              )}
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
        <div className={`${classes['c-user-profile-page__posts']}`}>
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default UserProfilePage;
