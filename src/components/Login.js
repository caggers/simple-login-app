import React, { Component } from 'react';
import Button from './Button';

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

  handleBtnClick = (e) => {
    e.preventDefault();
  }

  render() {
    console.log(this.state);
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