const dotenv = require('dotenv');
import axios from 'axios';
import { Global } from '../types/Global';

dotenv.config({ path: './@config/.development.env' })

const {
  DOJOS_MS_URL,
  STUDENTS_MS_URL,
  DOMAINS_MS_URL,
  TEACHERS_MS_URL,
  MESSAGES_MS_URL
} = process.env;

const dojosMS = axios.create({
  baseURL: DOJOS_MS_URL,
});

const studentsMS = axios.create({
  baseURL: STUDENTS_MS_URL,
})

const domainsMS = axios.create({
  baseURL: DOMAINS_MS_URL,
})

const teachersMS = axios.create({
  baseURL: TEACHERS_MS_URL,
})

const messagesMS = axios.create({
  baseURL: MESSAGES_MS_URL,
})

dojosMS.interceptors.request.use(
  async config => {
    const originalRequest = config;
    try {
      originalRequest.headers = {
        authorization: `Bearer ${Global.tokens.token}`
      };
      return originalRequest;
    } catch (error) {
      // Error retrieving data
    }
    return config;
  },
  err => Promise.reject(err)
);

studentsMS.interceptors.request.use(
  async config => {
    const originalRequest = config;
    try {
      originalRequest.headers = {
        authorization: `Bearer ${Global.tokens.token}`
      };
      return originalRequest;
    } catch (error) {
      // Error retrieving data
    }
    return config;
  },
  err => Promise.reject(err)
);

domainsMS.interceptors.request.use(
  async config => {
    const originalRequest = config;
    try {
      originalRequest.headers = {
        authorization: `Bearer ${Global.tokens.token}`
      };
      return originalRequest;
    } catch (error) {
      // Error retrieving data
    }
    return config;
  },
  err => Promise.reject(err)
);

teachersMS.interceptors.request.use(
  async config => {
    const originalRequest = config;
    try {
      originalRequest.headers = {
        authorization: `Bearer ${Global.tokens.token}`
      };
      return originalRequest;
    } catch (error) {
      // Error retrieving data
    }
    return config;
  },
  err => Promise.reject(err)
);

messagesMS.interceptors.request.use(
  async config => {
    const originalRequest = config;
    try {
      originalRequest.headers = {
        authorization: `Bearer ${Global.tokens.token}`
      };
      return originalRequest;
    } catch (error) {
      // Error retrieving data
    }
    return config;
  },
  err => Promise.reject(err)
);

export { dojosMS, studentsMS, domainsMS, teachersMS, messagesMS };
