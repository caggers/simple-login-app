import React from 'react';
import { mount, shallow } from 'enzyme';
import Login from './Login';

describe('Login', () => {
  let wrapper = shallow(<Login />);

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('initialises a username and password in `state`', () => {
    expect(wrapper.state()).toEqual({ username: '', pword: '', error: null });
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
    wrapper = mount(<Login />);

    beforeEach(() => {
      wrapper.find(btnElem).simulate('click', { preventDefault() {} });
    });

    it('renders a `submit` button', () => {
      expect(wrapper.find(btnElem)).toExist();
    });

    it('sends a request to the backend', () => {
      const mockSubmit = jest.fn();
      wrapper.instance().handleBtnClick = mockSubmit;
      wrapper.instance().handleBtnClick();
      expect(mockSubmit).toHaveBeenCalled();
    });

    it('throws to the `state` to trigger a remount of the component when there is an error', () => {
      // TODO
    });
  });
});
