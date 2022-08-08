import axios from 'axios';
import {HOST} from '@env';

console.log('SERVER at: ', HOST);

export const Axios = axios.create({
  baseURL: HOST,
  timeout: 10000,
});
