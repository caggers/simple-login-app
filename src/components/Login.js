import React, { Component } from 'react';


class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      pword: ''
    }
  }

  handleChange = (e) => {
    const val = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: val
    });
  }

  render() {
    return(
      <form>
        <input 
          className="input-username"
          name="username"
          onChange={this.handleChange} 
        />
        <input 
          className="input-password"
          name="pword"
          onChange={this.handleChange}  />
      </form>
    );
  }
}

export default Login;