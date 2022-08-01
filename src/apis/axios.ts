import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://192.168.43.71:3000/',
  timeout: 10000,
});
