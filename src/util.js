import axios from 'axios';

export const API_URL = 'http://demo5348002.mockable.io/';

export class ErrorMsg {
  constructor(status, msg) {
    this.status = status;
    this.msg = msg;
  }
}

export async function postCredentials(user, pword) {
  const response = await axios.post(API_URL, {
    data: { username: user, pword: pword },
  });

  if (response.status === 200) {
    return response;
  } else {
    throw new ErrorMsg(response.status, response.data.message);
  }
}
