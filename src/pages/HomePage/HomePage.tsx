import Layout from 'src/components/Layout/Layout';
import classes from './HomePage.module.scss';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import Button from 'src/components/core/Button/Button';
import Input from 'src/components/core/Input/Input';
import Card from 'src/components/Card/Card';
import { useState, useEffect } from 'react';
import User from 'src/models/User';
import { getUser } from 'src/services/UserService';
import { getUserIdFromToken } from 'src/services/AuthService';
import NewPost from 'src/models/NewPost';
import { createPost, getFriendsPost } from 'src/services/PostService';
import { toast } from 'react-toastify';
import Message from 'src/components/Message/Message';
import PostData from 'src/models/Post';
import Post from 'src/components/Post/Post';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const [posts, setPosts] = useState<PostData[]>([]);
  const id = getUserIdFromToken();

  const [newPost, setNewPost] = useState<NewPost>({
    description: '',
    file: null
  });

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getUser(Number.parseInt(id ?? '')).then((response) => {
      if (response.status == 200) {
        setUser(response.data);
      }
    });
    getFriendsPost(Number.parseInt(id ?? '')).then((response) => {
      setPosts(response.data);
    });
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewPost({ ...newPost, description: e.target.value });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    console.log(e.target.files![0]);
    setNewPost({
      ...newPost,
      file: file
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newPost.description.trim() !== '') {
      createPost(id, newPost)
        .then(() => {
          toast.success('Successfully created post!');
          navigate(`/profile/${id}`);
        })
        .catch((error) => {
          if (error.response.status == 400) {
            setErrorMessage(error.response.data.message);
          } else {
            toast.error('Something went wrong!');
          }
        });
    } else {
      setErrorMessage('Description is required!');
    }
  };

  return (
    <Layout>
      <div className={`${classes['c-home-page']}`}>
        <Card>
          <div className={`${classes['c-home-page__create-post']}`}>
            <div className={`${classes['c-home-page__user-info']}`}>
              <UserCircleIcon className={`${classes['c-home-page__icon']}`} />
              {user?.username && (
                <span>
                  <i>{`@${user.username}`}</i>
                </span>
              )}
            </div>
            <div className={`${classes['c-home-page__post-form']}`}>
              <form onSubmit={handleSubmit}>
                <textarea
                  rows={10}
                  cols={100}
                  placeholder='What are you thinking about?'
                  value={newPost.description}
                  onChange={handleInputChange}
                />
                <div className={`${classes['c-home-page__submit']}`}>
                  <Input type='file' error onChange={handleFileUpload} />
                  <div className={`${classes['c-home-page__submit-button']}`}>
                    <Button label='Create post' />
                  </div>
                </div>
                <Message
                  icon={<ExclamationCircleIcon width={16} height={16} />}
                  message={errorMessage}
                />
              </form>
            </div>
          </div>
        </Card>
        {posts.map((post) => <Post key={post.id} post={post} />).reverse()}
      </div>
    </Layout>
  );
};

export default HomePage;
