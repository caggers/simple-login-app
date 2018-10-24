import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App', () => {
  const app = shallow(<App />);
  it('renders correctly', () => {
    expect(app).toMatchSnapshot();
  });

  it('initialises with an isAuthenticated in `state`', () => {
    expect(app.state().isAuthenticated).toEqual(false);
  });

  it('updates the `state` of isAuthenticated', () => {
    app.instance().authenticateUser();
    expect(app.state().isAuthenticated).toEqual(true);
    app.setState({ isAuthenticated: false });
  });

  it('renders the login component conditionally', () => {
    app.setState({ isAuthenticated: false });
    expect(app.find('.login')).toExist();
  });

  it('renders the welcome component conditionally', () => {
    app.setState({ isAuthenticated: true });
    expect(app.find('.welcome-message')).toExist();
  });
});
