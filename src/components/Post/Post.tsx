import { UserCircleIcon } from '@heroicons/react/24/solid';
import Card from '../Card/Card';
import classes from './Post.module.scss';
import User from 'src/models/User';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { getUser } from 'src/services/UserService';
import PostData from 'src/models/Post';

interface PostProps {
  post: PostData;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    getUser(post.userId).then((response) => {
      setUser(response.data);
    });
  }, [post.userId]);

  return (
    <Card>
      <div className={`${classes['c-post__post-header']}`}>
        <div className={`${classes['c-post__user-data']}`}>
          <UserCircleIcon className={`${classes['c-post__icon']}`} />
          {user?.username && (
            <span className={`${classes['c-post__username']}`}>
              <i>{`@${user.username}`}</i>
            </span>
          )}
        </div>
        <span className={`${classes['c-post__date']}`}>
          <i>{dayjs(post.postedAt).format('MMMM D, YYYY HH:mm')}</i>
        </span>
      </div>
      <div className={`${classes['c-post__post-data']}`}>
        <div className={`${classes['c-post__description']}`}>{post.description}</div>
        {post.file && <img src={`http://localhost:8080/api/v1/posts/${post.id}/files`} />}
      </div>
    </Card>
  );
};

export default Post;
