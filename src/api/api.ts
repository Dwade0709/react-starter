import axiosInstance from './axios';
import { loadToken } from './auth/utils';
import * as auth from './auth';

const api = {
  // Pre-configured HTTP request instances
  axios: axiosInstance,
  // firebase: firebaseInstance, // use FireBase if needed
  // fetch: fetch, // use custom fetch is needed

  // Properties
  token: () => loadToken(),
  get url() {
    return axiosInstance?.defaults?.baseURL;
  },

  // API "modules"
  auth,
};

export default api;
