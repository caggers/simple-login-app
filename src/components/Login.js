import React, { Component } from 'react';
import Button from './Button';
import { postCredentials } from '../util';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      pword: '',

    }
  }

  handleInputChange = (e) => {
    const val = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: val
    });
  }

  handleBtnClick = async (e) => {
    e.preventDefault();
    let postReq = await postCredentials(this.state.username, this.state.pword);
    // console.log(postReq);
  }

  render() {
    return(
      <div>
        <h1>Login</h1> 
        <form>
          <div className="form-row">
            <label>
              Username:
              <input 
                className="input-username"
                name="username"
                onChange={(e) => {this.setState({ username: e.target.value})}} 
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              Password:
              <input 
                className="input-password"
                name="pword"
                onChange={this.handleInputChange}  />
            </label>
          </div>
          <div className="form-row">
            <Button 
              onClick={this.handleBtnClick} 
              text="Submit"
              className="btn-submit" 
              type="submit"/>
          </div> 
        </form>
      </div>
      
    );
  }
}

export default Login;