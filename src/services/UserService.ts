import axios from 'src/config/axios/axios';

export const getUser = async (id: number) => {
  return await axios.get(`/users/${id}`);
};
