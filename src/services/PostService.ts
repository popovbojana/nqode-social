import axios from 'src/config/axios/axios';
import NewPost from 'src/models/NewPost';

export const createPost = (id: number, newPost: NewPost) => {
  const formData = new FormData();

  formData.append('description', newPost.description);

  if (newPost.file != null) {
    formData.append('file', newPost.file);
  }

  return axios.post(`/users/${id}/posts`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const getPosts = (id: number) => {
  return axios.get(`/users/${id}/posts`);
};

export const getFriendsPost = (id: number) => {
  return axios.get(`/users/${id}/friends-posts`);
};

export const deletePost = (id: number) => {
  return axios.delete(`/posts/${id}`);
};
