import axios from 'axios';

export const API_URL = 'http://demo5348002.mockable.io/';

export async function postCredentials(user, pword) {
  const response = await axios.post(API_URL, {
    data: { username: user, pword: pword },
  });
  return response;
}