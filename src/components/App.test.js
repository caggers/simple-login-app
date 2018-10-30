import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';

describe('App', () => {
  let app = mount(<App isAuthenticated={false} />);
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
    expect(app.find('.login')).toExist();
  });

  it('renders the welcome component conditionally', () => {
    app.setState({ isAuthenticated: true });
    expect(app.find('.welcome-message')).toExist();
  });
});
