import React, { Component } from 'react';
import Login from './Login';
import ErrorBoundary from './ErrorBoundary';

class App extends Component {
  render() {
    return (
      <div>
        <ErrorBoundary>
          <Login />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
