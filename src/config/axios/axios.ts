import Axios from 'axios';

const axios = Axios.create({ baseURL: import.meta.env.VITE_BACKEND_URL, withCredentials: true });

export default axios;
