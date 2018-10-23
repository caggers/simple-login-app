import React, { Component } from 'react';
import Button from './Button';
import { postCredentials } from '../util';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      pword: '',
      error: null,
    };
  }

  handleInputChange = e => {
    const val = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: val,
    });
  };

  handleBtnClick = async e => {
    e.preventDefault();
    try {
      let postReq = await postCredentials(
        this.state.username,
        this.state.pword
      );
      
      // console.log(postReq);
    } catch (e) {
      // Throw on error on an event handler
      this.setState(() => {
        throw e;
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
      </div>
    );
  }
}

export default Login;
