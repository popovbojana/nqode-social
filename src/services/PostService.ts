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
