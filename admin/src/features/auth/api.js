import axios from 'axios';
import { MAIN_API } from '../../constants';

const auth = async (authParams) => {
  const response = await axios.post(
    MAIN_API + '/api/v1/users/authentication',
    authParams
  );

  return response.data;
};

const getUser = async (token, userId) => {
  console.log('token', token);
  const response = await axios.get(MAIN_API + '/api/v1/users/authorize', {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  return response.data;
};

export { auth, getUser };
