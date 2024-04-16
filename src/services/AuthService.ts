import axios from 'src/config/axios/axios';
import AuthenticationRequest from 'src/models/AuthenticationRequest';
import NewUser from 'src/models/NewUser';

export const authenticate = async (authenticationRequest: AuthenticationRequest) => {
  return await axios.post(`/auth/login`, authenticationRequest);
};

export const register = async (newUser: NewUser) => {
  return await axios.post('auth/register', newUser);
};
