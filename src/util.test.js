// tell the tests to use this mocked "axios" module instead of the actual axios
import mockAxios from './__mocks__/axios';
import { USERS, checkUser, postReq, checkUserCredentials } from './util';

describe('it posts the some data to the `API_URL`', () => {
  let req;
  const sampleData = { data: { username: 'user', pword: 'user' } };
  const sampleRes = {
    status: 200,
    data: {
      message: 'User logged in with: $username',
    },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('checks the user is in USERS array and the user is in it', async () => {
    const pos = checkUser('user', USERS);
    expect(pos).toEqual([
      {
        username: 'user',
        privileges: 'user',
        id: '000',
      },
    ]);

    mockAxios.post.mockResolvedValueOnce(sampleData);

    const checkedUser =
      pos !== false
        ? await postReq('user', 'user')
        : 'This user does not exist';

    return expect(checkedUser).toEqual(sampleData);
  });

  it('checks the user is in the USERS array and the user is not in it', () => {
    const neg = checkUser('baduser', USERS);
    expect(neg).toEqual(false);

    const checkedUser = neg !== false ? sampleData : 'This user does not exist';

    return expect(checkedUser).toEqual('This user does not exist');
  
  });

  it('checks the users credentials in #checkUserCredentials', async () => {    
    const checkUserCredentials = jest
      .fn()
      .mockImplementationOnce((user, pword) => {
        const checkedUser = checkUser(user, USERS);
        return checkedUser !== false ? sampleData : 'This user does not exist';
      })
      .mockImplementationOnce((user, pword) => {
        const checkedUser = checkUser(user, USERS);
        return checkedUser !== false ? sampleData : 'This user does not exist';
      });

      expect(checkUserCredentials('baduser', 'user')).toEqual('This user does not exist');
      expect(checkUserCredentials('user', 'user')).toEqual(sampleData);

  });

  it('posts some data to the backend', async () => {
    // Create a one off instance where the post function returns specific values
    mockAxios.post.mockImplementationOnce(() => Promise.resolve(sampleData));

    req = await postReq('user', 'user');

    expect(req).toEqual(sampleData);
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(mockAxios.post).toHaveBeenCalledWith(
      'http://demo5348002.mockable.io/',
      sampleData
    );
  });

  it('receives a 200 response from the backend in postReq', async () => {
    mockAxios.post.mockReturnValueOnce(sampleRes);
    req = await postReq('user', 'user');

    expect(req).toEqual(sampleRes);
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(mockAxios.post).toHaveReturnedWith(sampleRes);
  });

  it('catches the error in postReq', async () => {
    mockAxios.post.mockImplementationOnce(() => Promise.reject('error'));
    expect.assertions(1);

    return await postReq('baduser', 'badword').catch(e => {
      expect(e).toEqual('error');
    });
  });


});
