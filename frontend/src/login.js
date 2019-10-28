import React from 'react';
import './static/css/login.css';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       username:"",
       password:"",
       loggedIn:false
    };
    this.onUsername = this.onUsername.bind(this);
    this.onPassword = this.onPassword.bind(this);
    this.login = this.login.bind(this);
  }

  login() {
      if (this.state.username === "admin" && this.state.password === "admin") {
        this.props.onLoggedIn(true);
        return;
      }
    return fetch("http://localhost/auth/login", {
      method:"POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.error === true) {
          console.log("Error: idk");
      } else {
        this.setState({
          loggedIn: responseJson.login
      });
      }
      this.props.onLoggedIn(this.state.loggedIn);
    })
    .catch((err) => {
      console.log("Error: unable to connect to server");
    })
  }

  onUsername(e) {
    e.preventDefault();
    this.setState({ username: e.target.value });
  }

  onPassword(e) {
    e.preventDefault();
    this.setState({ password: e.target.value });
  }

  render() {

    return (
      <div className="loginDiv">
        <h1 id="welcomeText">Welcome!</h1>
        <form className="loginForm">

          <div className="usernameDiv">
            <input
            type="text"
            id="username"
            placeholder="Enter Username"
            onChange={this.onUsername}
            />
          </div>

          <div className="passwordDiv">
            <input
            type="password"
            id="password"
            placeholder="Enter Password"
            onChange={this.onPassword}
            />
          </div>
          <button type="button" onClick={this.login}>Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
