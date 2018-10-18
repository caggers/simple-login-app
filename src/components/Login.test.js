import React from 'react';
import { mount, shallow } from 'enzyme';
import Login from './Login';

describe('Login', () => {
  const mockSubmit = jest.fn();
  const username = 'user';
  const pword = 'user';
  const props = {
    username: username,
    password: pword,
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
    const userEvent = { target: { value: username, name: 'username' } };
    const pwordEvent = { target: { value: pword, name: 'pword' } };

    const userInput = wrapper.find('input.input-username');
    const pwordInput = wrapper.find('.input-password');

    it('renders the username and password inputs', () => {
      expect(userInput).toExist();
      expect(pwordInput).toExist();
    });

    beforeEach(() => {
      userInput.simulate('change', userEvent);
      pwordInput.simulate('change', pwordEvent);
    });

    it('when typing into the inputs it updates relevant fields in `state`', () => {
      expect(wrapper.state().username).toEqual(username);
      expect(wrapper.state().pword).toEqual(pword);
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
