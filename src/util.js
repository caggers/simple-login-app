import axios from 'axios';

export const API_URL = 'http://demo5348002.mockable.io/';

export const USERS = [
  {
    username: 'user',
    privileges: 'user',
    id: '000',
  },
  {
    username: 'admin',
    privileges: 'admin',
    id: '001',
  },
];

export function checkUser(username, userArray) {
  const matchUser = userArray.filter(user => {
    return user.username === username;
  });
  return matchUser.length >= 1 ? matchUser : [];
}

export async function postReq(user, pword) {
  try {
    return await axios.post(API_URL, {
      data: { username: user, pword: pword },
    });
  } catch (e) {
    throw e;
  }
}

export async function checkUserCredentials(user, pword) {
  const checkedUser = checkUser(user, USERS);
  return checkedUser.length > 0
    ? await postReq(user, pword)
    : 'This user does not exist';
}
