import axios from 'axios';
import { cacheAdapterEnhancer } from 'axios-extensions';

const axiosInstance = axios.create({
  baseURL: 'https://satrabmeetup.herokuapp.com/'
});

if (window.localStorage.getItem('token')) {
  axiosInstance.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${window.localStorage.getItem('token')}`;
}

export default axiosInstance;
