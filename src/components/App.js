import React, { Component } from 'react';
import Login from './Login';
import ErrorBoundary from './ErrorBoundary';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false,
    };
  }

  authenticateUser = () => {
    this.setState({ isAuthenticated: true });
  };

  render() {

    return (
      <div>
        {this.state.isAuthenticated ? (
          <div className="welcome-message">Welcome Back </div>
        ) : (
          <ErrorBoundary>
            <Login authenticateUser={this.authenticateUser} className="login" />
          </ErrorBoundary>
        )}
      </div>
    );
  }
}

export default App;
