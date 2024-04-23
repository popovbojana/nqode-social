import axios from 'src/config/axios/axios';
import NewComment from 'src/models/NewComment';

export const createComment = (id: number, newComment: NewComment) => {
  return axios.post(`/posts/${id}/comments`, newComment);
};
