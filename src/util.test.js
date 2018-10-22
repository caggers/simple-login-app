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
      const error = new ErrorMsg();
      expect(e).toEqual(error);
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

    mockAxios.post.mockReturnValueOnce(sampleRes);

    req = await postCredentials('user', 'user');
    expect(req).toEqual(sampleRes);

    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(mockAxios.post).toHaveReturnedWith(sampleRes);
  });

  it('does not receive a 200 response from the backend', async () => {
    const sampleRes = {
      status: 400,
      data: {
        message: 'Error connecting to API',
      },
    };

    mockAxios.post.mockReturnValueOnce(sampleRes);

    try {
      req = await postCredentials('user', 'user');
      expect(req).toEqual(sampleRes);
    } catch (e) {

      //When there is a working api these values can be assigned dynamically 
      const error = new ErrorMsg(e.status, 'Error connecting to API');
      expect(e).toEqual(error);
    }

    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(mockAxios.post).toHaveReturnedWith(sampleRes);
  });
});
