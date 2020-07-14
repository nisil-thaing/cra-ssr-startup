import Axios from 'axios';

// import { API_ENDPOINT } from 'app/utils/env-vars.util';
// import { getCookie, COOKIE_KEYS } from 'app/utils/api-request.util';

export const REQUEST_TIMEOUT = 20000;

const axiosInstance = Axios.create({
  // baseURL: `${ API_ENDPOINT }/api/admin`,
  timeout: REQUEST_TIMEOUT
});

axiosInstance.interceptors.request.use(function (config) {
  const userToken = 'dummytoken'; // getCookie(COOKIE_KEYS.ACCESS_TOKEN);

  if (userToken != null) {
    config.headers.Authorization = `Bearer ${ userToken }`;
  }

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

export default axiosInstance;