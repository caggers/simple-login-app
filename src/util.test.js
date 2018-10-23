// This is not a good set of tests for and api

import mockAxios from './__mocks__/axios';
import { postCredentials, ErrorMsg } from './util';

describe('it posts the some data to the `API_URL`', () => {
  let req;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('posts some data to the backend', async () => {
    const sampleData = { data: { username: 'user', pword: 'user' } };

    // Create a one off instance where the post function returns specific values
    mockAxios.post.mockImplementation(() => Promise.resolve(sampleData));

    try {
      req = await postCredentials('user', 'user');
      expect(req).toEqual(sampleData);
    } catch (e) {
      console.log('Error in it posts some data to the backend');
      throw e;
    }

    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(mockAxios.post).toHaveBeenCalledWith(
      'http://demo5348002.mockable.io/',
      sampleData
    );
  });

  it('receives a 200 response from the backend', async () => {
    const sampleRes = {
      status: 200,
      data: {
        message: 'User logged in with: $username',
      },
    };

    try {
      mockAxios.post.mockReturnValueOnce(sampleRes);
      req = await postCredentials('user', 'user');
      expect(req).toEqual(sampleRes);
    } catch (e) {
      console.log('Error receives a 200');
      throw e;
    }

    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(mockAxios.post).toHaveReturnedWith(sampleRes);
  });
});
