import axios from 'axios';
import { messagerModel } from 'entities/messager';

export const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 1000,
});

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log('error', error);
    // messagerModel.error(error.message);
    messagerModel.error(error.response.data.message);
    return Promise.reject(error);
  }
);
