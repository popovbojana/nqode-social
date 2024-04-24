import axios from 'src/config/axios/axios';

export const getFriendRequests = (id: number) => {
  return axios.get(`/users/${id}/friend-requests`);
};

export const respondToFriendRequest = (fromUserId: number, toUserId: number, status: string) => {
  return axios.put(
    `/friend-requests/responses?fromUserId=${fromUserId}&toUserId=${toUserId}&status=${status}`
  );
};

export const createFriendRequest = (fromUserId: number, toUserId: number) => {
  return axios.post(`/friend-requests?fromUserId=${fromUserId}&toUserId=${toUserId}`);
};

export const getFriendRequest = (fromUserId: number, toUserId: number) => {
  return axios.get(`/friend-requests?fromUserId=${fromUserId}&toUserId=${toUserId}`);
};
