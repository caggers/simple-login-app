import React, { Component } from 'react';
import Button from './Button';
import { checkUserCredentials } from '../util';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      pword: '',
      error: null,
      errorDiv: false
    };
  }

  handleInputChange = e => {
    const val = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: val,
    });
  };

  handleReturnedData(postReq) {
    if(postReq.status === 200) {
      this.setState({ errorDiv: false });
      this.props.authenticateUser();
    } else {
      this.setState({ errorDiv: postReq });
    }
  }

  handleBtnClick = async event => {
    event.preventDefault();
    try {
      const postReq = await checkUserCredentials(
        this.state.username,
        this.state.pword
      );
      this.handleReturnedData(postReq);
      
    } catch (error) {
      // Throw on error on an event handler
      this.setState(() => {
        throw error;
      });
    }
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form>
          <div className="form-row">
            <label>
              Username:
              <input
                className="input-username"
                name="username"
                onChange={e => {
                  this.setState({ username: e.target.value });
                }}
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              Password:
              <input
                className="input-password"
                name="pword"
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div className="form-row">
            <Button
              onClick={this.handleBtnClick}
              text="Submit"
              className="btn-submit"
              type="submit"
            />
          </div>
        </form>
        { this.state.errorDiv && 
          <div className="error-div">{this.state.errorDiv}</div>
        }
      </div>
    );
  }
}

export default Login;
