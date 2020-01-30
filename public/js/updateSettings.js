/* eslint-disable*/

import axios from 'axios';
import { showAlert } from './alerts';

// type is either 'password or 'data'
export const updateSettings = async (data, type) => {
  console.log(data);
  const url =
    type === 'password'
      ? 'http://localhost:3000/api/v1/users/updateMyPassword'
      : 'http://localhost:3000/api/v1/users/updateMe';
  try {
    const res = await axios({
      method: 'PATCH',
      url,
      data
    });
    console.log(res);
    if (res.data.status === 'success')
      showAlert('success', `${type.toUpperCase()} updated succesfully`);
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
