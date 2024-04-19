import axios from 'src/config/axios/axios';

export const getPendingFriendRequests = (id: number) => {
  return axios.get(`/users/${id}/friend-requests?status=PENDING`);
};
