import React from 'react';
import { mount, shallow } from 'enzyme';
import Login from './Login';

describe('Login', () => {
  const props = { authenticateUser: jest.fn() };
  const wrapper = mount(<Login {...props} />);

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('initialises a username, password, error in `state`', () => {
    expect(wrapper.state()).toEqual({
      username: '',
      pword: '',
      error: null,
      errorDiv: false,
    });
  });

  describe('User inputs', () => {
    const user = 'user';
    const userPW = 'user';

    const userEvent = { target: { value: user, name: 'username' } };
    const pwordEvent = { target: { value: userPW, name: 'pword' } };

    const userInput = wrapper.find('input.input-username');
    const pwordInput = wrapper.find('.input-password');

    it('renders the username and password inputs', () => {
      expect(userInput).toExist();
      expect(pwordInput).toExist();
    });

    beforeEach(() => {
      // tests will not accept variables here, but they will above?
      wrapper.find('input.input-username').simulate('change', userEvent);
      wrapper.find('.input-password').simulate('change', pwordEvent);
    });

    it('when typing into the inputs it updates relevant fields in `state`', () => {
      expect(wrapper.state().username).toEqual(user);
      expect(wrapper.state().pword).toEqual(userPW);
    });
  });

  describe('Submit Button', () => {
    const btnElem = `button.btn-submit`;

    beforeEach(() => {
      // wrapper.find(btnElem).simulate('click', { preventDefault() {} });
    });

    afterEach(() => {});

    it('renders a `submit` button', () => {
      expect(wrapper.find(btnElem)).toExist();
    });

    it('calls #handleBtnClick when clicked', () => {
      const mockedBtnClick = jest.fn().mockImplementationOnce(() => {
        // try {
        Promise.resolve({});
        // } catch (err) {
        //   wrapper.setState(() => {throw err} );
        // }
      });
      wrapper.instance().handleBtnClick = mockedBtnClick;
      wrapper.instance().handleBtnClick();

      expect(wrapper.instance().handleBtnClick).toBeCalledTimes(1);
    });

    // it('calls checkUserCredentials #handleButtonClick', async () => {
    //   const sampleRes = {
    //     status: 200,
    //     data: { message: 'User logged in with: $username' },
    //   }
    //   const checkUserCredentials = jest.fn().mockImplementationOnce(() =>
    //     Promise.resolve(sampleRes)
    //   );

    //   const req = await checkUserCredentials('user', 'user');
    //   expect(req).toEqual(sampleRes);
    // });

    // it('catches the error of #handleButtonClick', async () => {
    //   // TODO catch the error when it triggers in setState()
    //   const checkUserCredentials = jest
    //     .fn()
    //     .mockImplementationOnce(() => Promise.reject('error'));

    //   return await checkUserCredentials().catch(e =>
    //     expect(e).toEqual('error')
    //   );
    // });

    it('calls #handleReturnedData with a valid user', () => {
      const mHandleReturnedData = jest.fn().mockImplementation(() => {
        wrapper.setState({ errorDiv: false });
      });

      wrapper.instance().handleReturnedData = mHandleReturnedData;
      wrapper.instance().handleReturnedData();

      expect(mHandleReturnedData).toHaveBeenCalledTimes(1);
    });

    it('calls #handleReturnedData invalid user', () => {
      const mHandleReturnedData = jest.fn().mockImplementation(() => {
        wrapper.setState({ errorDiv: 'this is error text' });
      });

      wrapper.instance().handleReturnedData = mHandleReturnedData;
      wrapper.instance().handleReturnedData();

      expect(mHandleReturnedData).toHaveBeenCalledTimes(1);
      expect(wrapper.find('.error-div').length).toBe(1);
    });
  });
});
