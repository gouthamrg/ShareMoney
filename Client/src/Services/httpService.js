import axios from 'axios';

axios.interceptors.response.use(null, (error) => {
  // Do something with response error

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};