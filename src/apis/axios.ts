import axios from 'axios';
import {HOST} from '@env';

console.log('SERVER at: ', HOST);

export const instance = axios.create({
  baseURL: HOST,
  timeout: 10000,
});
