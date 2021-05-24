import axios from 'axios';
import { MAIN_API } from '../constants';

export const apiRequest = (method, link, body) => {
  const { token } = JSON.parse(localStorage.getItem('accessToken'));
  if (method === 'POST') {
    return axios.post(`${MAIN_API}/api/v1${link}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  if (method === 'GET') {
    return axios.get(`${MAIN_API}/api/v1${link}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  if (method === 'PUT') {
    return axios.put(`${MAIN_API}/api/v1${link}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  if (method === 'DELETE') {
    return axios.delete(`${MAIN_API}/api/v1${link}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
};
