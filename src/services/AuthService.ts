import axios from 'src/config/axios/axios';
import AuthenticationRequest from 'src/models/AuthenticationRequest';
import NewUser from 'src/models/NewUser';

export const authenticate = (authenticationRequest: AuthenticationRequest) => {
  // TODO: API call
  console.log(authenticationRequest);
};

export const register = async (newUser: NewUser) => {
  return await axios.post('auth/register', newUser);
};
