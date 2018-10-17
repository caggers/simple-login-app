import React from 'react';
import { shallow, mount } from 'enzyme';
import Login from './Login';

describe('Login', () => {
  const login = shallow(<Login />);

  it('renders correctly', () => {
    expect(login).toMatchSnapshot();
  });

  it('initialises a username and password in `state`', () => {
    expect(login.state()).toEqual({ username: '', pword: '' });
  });

  describe('User input', () => {
    const username = 'user';
    const pword = 'p@$$word';


    beforeEach(() => {
      login
        .find('.input-username')
        .simulate('change', { target: { value: username, name: 'username' } });
      login
        .find('.input-password')
        .simulate('change', { target: { value: pword, name: 'pword' } });
    });

    it('renders the inputs', () => {
      expect(login.find('.input-username')).toExist();
      expect(login.find('.input-password')).toExist();
    });

    it('when typing into the inputs it updates relevant fields in `state`', () => {
      expect(login.state().username).toEqual(username);
      expect(login.state().pword).toEqual(pword);
    });
  });

  // describe('Password Input', () => {
   
  //   beforeEach(() => {
  //     login
  //       .find('.input-password')
  //       .simulate('change', { target: { value: pword, name: 'pword' } });
  //   });

  //   it('renders the password input', () => {
      
  //   });

  //   it('when typing into the input it updates the password in `state`', () => {
      
  //   });
  // });
});
