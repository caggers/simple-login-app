import mockAxios from './__mocks__/axios';
import { postCredentials } from './util';

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
    } catch (e) {
      expect(e).toEqual({
        error: 'API Error',
      });
    }

    expect(req).toEqual(sampleData);
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(mockAxios.post).toHaveBeenCalledWith(
      'http://demo5348002.mockable.io/',
      sampleData
    );
  });

  it('receives a 200 response from the backend', async () => {
    const sampleRes = {
      status: 200,
      message: 'User logged in with: $username',
    };

    mockAxios.post.mockReturnValueOnce(sampleRes);

    try {
      req = await postCredentials('user', 'user');
    } catch (e) {
      expect(e).toEqual({
        error: 'API Error',
      });
    }

    expect(req).toEqual(sampleRes);
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(mockAxios.post).toHaveReturnedWith(sampleRes);
  });
});
