import { jwtDecode } from 'jwt-decode';
import axios from 'src/config/axios/axios';
import AuthenticationRequest from 'src/models/AuthenticationRequest';
import NewUser from 'src/models/NewUser';

export const authenticate = (authenticationRequest: AuthenticationRequest) => {
  return axios.post(`/auth/login`, authenticationRequest);
};

export const register = (newUser: NewUser) => {
  return axios.post('auth/register', newUser);
};

export const getUserIdFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return;
  return jwtDecode(JSON.parse(localStorage.getItem('token')!)).id;
};
