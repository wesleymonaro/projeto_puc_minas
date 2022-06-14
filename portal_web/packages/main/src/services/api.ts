import { KEY_ACCESS_TOKEN } from "@doar/shared/consts";
import axios from "axios";
// import { getUserTokenFromStorage } from '../utils/storage';

// export const API_URL = __DEV__ ? 'http://4fd2-186-225-23-15.ngrok.io' : 'https://my-pizza-api.herokuapp.com';

const studentsURL = `http://localhost:3001/v1/`;
const domainsURL = `http://localhost:3002/v1/`;
const teachersURL = `http://localhost:3003/v1/`;

const studentsApi = axios.create({
  baseURL: studentsURL,
});

const domainsApi = axios.create({
  baseURL: domainsURL,
});

const teachersApi = axios.create({
  baseURL: teachersURL,
});

const logRequest = (request: any): void => {
  console.log("-------API-REQUEST--------");
  console.log(request);
  console.log("---------------");
};

studentsApi.interceptors.request.use(
  (config) => {
    const originalRequest = config;
    try {
      const token = localStorage.getItem(KEY_ACCESS_TOKEN);
      if (token && originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${token}`;
      }
      logRequest(originalRequest);
      return originalRequest;
    } catch (error) {
      // Error retrieving data
      console.log("erro aqui", error);
    }
    return config;
  },
  (err) => Promise.reject(err)
);

domainsApi.interceptors.request.use(
  (config) => {
    const originalRequest = config;
    try {
      const token = localStorage.getItem(KEY_ACCESS_TOKEN);
      if (token && originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${token}`;
      }
      logRequest(originalRequest);
      return originalRequest;
    } catch (error) {
      // Error retrieving data
    }
    return config;
  },
  (err) => Promise.reject(err)
);

teachersApi.interceptors.request.use(
  (config) => {
    const originalRequest = config;
    try {
      const token = localStorage.getItem(KEY_ACCESS_TOKEN);
      if (token && originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${token}`;
      }
      logRequest(originalRequest);
      return originalRequest;
    } catch (error) {
      // Error retrieving data
    }
    return config;
  },
  (err) => Promise.reject(err)
);

export { studentsApi, domainsApi, teachersApi };
