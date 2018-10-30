// tell the tests to use this mocked "axios" module instead of the actual axios
import mockAxios from './__mocks__/axios';
import { USERS, checkUser, postReq } from './util';

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

  it('checks the user', () => {
    const goodUser = checkUser('user', USERS);
    expect(goodUser).toHaveLength(1);

    const badUser = checkUser('baduser', USERS);
    expect(badUser).toEqual(false);
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

  it('catches the error in postReq', async () => {
    mockAxios.post.mockImplementationOnce(() => Promise.reject('error'));
    expect.assertions(1);

    return await postReq('baduser', 'badword').catch(e => {
      expect(e).toEqual('error');
    });
  });

//   it('checks a valid users credentials in #checkUserCredentials', async () => {
//     mockAxios.post.mockImplementationOnce(() => Promise.resolve(sampleRes));
//     req = await postReq('user', 'user');

//     const checkUserCredentials = jest
//       .fn()
//       .mockImplementationOnce((user, pword) => {
//         const checkedUser = checkUser(user, USERS);
//         if (checkedUser.length > 0) {
//           return req;
//         }

//         return 'This user does not exist';
//       });

//     checkUserCredentials('user', 'user');

//     expect(req).toEqual(sampleRes)
//     expect(mockAxios.post).toHaveBeenCalledTimes(1);
//     expect(mockAxios.post).toHaveBeenCalledWith('http://demo5348002.mockable.io/',
//     sampleData);
    

//     // expect(checkUserCredentials).toHaveBeenCalledTimes(1);
//     // expect(checkUserCredentials).toHaveReturnedWith(sampleRes);
//     // expect(a).toEqual(sampleRes);
//   });

//   it('checks an invalid users credentials in #checkUserCredentials', () => {
//     const checkUserCredentials = jest
//       .fn()
//       .mockImplementationOnce((user, pword) => {
//         const checkedUser = checkUser(user, USERS);
//         if (checkedUser.length > 0) {
//           return 'this will not be called';
//         }
//         return 'This user does not exist';
//       });

//     expect(checkUserCredentials('baduser', 'user')).toEqual(
//       'This user does not exist'
//     );
//   });
});
