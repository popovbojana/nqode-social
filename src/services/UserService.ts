import axios from 'src/config/axios/axios';
import UpdateUser from 'src/models/UpdateUser';

export const getUser = (id: number) => {
  return axios.get(`/users/${id}`);
};

export const updateUser = (id: number, updatedUser: UpdateUser) => {
  return axios.put(`/users/${id}`, updatedUser);
};

export const searchForUsers = (search: string) => {
  return axios.get(`/users?search=${search}`);
};

export const getAllFriends = (id: number) => {
  return axios.get(`/users/${id}/friends`);
};
