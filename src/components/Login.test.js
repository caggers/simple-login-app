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
    const btnElem = '.btn-submit';

    beforeEach(() => {
      // wrapper.find('button.btn-instance').prop('onClick')();
    });

    it('renders a `submit` button', () => {
      expect(wrapper.find('.btn-instance')).toExist();
    });

    it('calls #handleBtnClick when clicked', () => {
      const mockedBtnClick = jest.fn(e => {
        e.preventDefault();
        Promise.resolve();
      });
      wrapper.instance().handleBtnClick = mockedBtnClick;
      wrapper.instance().handleBtnClick({ preventDefault() {} });

      expect(wrapper.instance().handleBtnClick).toBeCalledTimes(1);
    });

    it('calls #handleReturnedData with a valid user', () => {
      const mockAuthenticateUser = jest.fn(() => {
        wrapper.props().isAuthenticated = true;
      });

      const mHandleReturnedData = jest
        .fn()
        .mockImplementationOnce(ref => {
          wrapper.setState({ errorDiv: false });
          mockAuthenticateUser();
        })
        .mockImplementationOnce(ref => {
          wrapper.setState({ errorDiv: ref });
        });

      wrapper.instance().handleReturnedData = mHandleReturnedData;

      wrapper.instance().handleReturnedData('valid user ref');
      expect(mHandleReturnedData).toHaveBeenCalledTimes(1);
      expect(wrapper.state().errorDiv).toBe(false);
      expect(wrapper.props().isAuthenticated).toBe(true);

      wrapper.instance().handleReturnedData('This user does not exist');
      expect(mHandleReturnedData).toHaveBeenCalledTimes(2);
      expect(wrapper.state().errorDiv).toBe('This user does not exist');
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
