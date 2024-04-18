import axios from 'src/config/axios/axios';
import UpdateUser from 'src/models/UpdateUser';

export const getUser = async (id: number) => {
  return await axios.get(`/users/${id}`);
};

export const updateUser = async (id: number, updatedUser: UpdateUser) => {
  return await axios.put(`/users/${id}`, updatedUser);
};
