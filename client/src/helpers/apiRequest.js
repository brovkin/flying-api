import axios from 'axios';
import { MAIN_API } from '../constants';

export const apiRequest = (method, link, body) => {
  if (method === 'GET') {
    return axios.get(`${MAIN_API}/api/v1${link}`);
  }
};
