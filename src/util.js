import axios from 'axios';

export const API_URL = 'http://demo5348002.mockable.io/';

export async function postCredentials(user, pword) {

  try {
    const response = await axios.post(API_URL, {
      data: { username: user, pword: pword },
    });
    return response !== undefined ? response : "Unsuccessful API request";
  } catch(e) {
    if (e instanceof TypeError) {
      throw TypeError(e);
    } else if(e instanceof ReferenceError ) {
      throw ReferenceError(e)
    } else {
      // rethrow
      throw e;
    }
  }
}
