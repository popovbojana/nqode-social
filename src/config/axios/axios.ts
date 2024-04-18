import Axios from 'axios';

const axios = Axios.create({ baseURL: import.meta.env.VITE_BACKEND_URL, withCredentials: true });

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + JSON.parse(token);
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axios;
