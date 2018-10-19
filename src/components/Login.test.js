import React from 'react';
import { mount, shallow } from 'enzyme';
import Login from './Login';

describe('Login', () => {
  const mockSubmit = jest.fn();
  const props = {
    username: '',
    password: '',
    handleBtnClick: mockSubmit,
  };
  let wrapper = shallow(<Login {...props} />);

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('initialises a username and password in `state`', () => {
    expect(wrapper.state()).toEqual({ username: '', pword: '' });
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
    wrapper = mount(<Login {...props} />);

    beforeEach(() => {
      wrapper.find(btnElem).simulate('click', { preventDefault() {} });
    });

    it('renders a `submit` button', () => {
      expect(wrapper.find(btnElem)).toExist();
    });
  });
});
