import axios from 'axios';

axios.interceptors.request.use((config) => {
  console.log(config);
  return config;
}, (error) => {
  return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
  // Do something with response data
  return response;
}, (error) => {
  // Do something with response error
  return Promise.reject(error);
});

export default axios;