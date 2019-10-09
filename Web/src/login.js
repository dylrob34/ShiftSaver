'use strict';

const el = React.createElement;

class LoginButton extends React.Component {
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
    console.log("well the function ran...")
    return fetch("/login", {
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
      this.setState({
        loggedIn: responseJson.text === "hello!" ? true : false
      });
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

    if (!this.state.loggedIn) {
    return (
      <div className="loginDiv">
        <form className="loginForm">
          <label htmlFor="username">Username:</label>
          <input
          type="text"
          id="username"
          placeholder="Enter Username"
          onChange={this.onUsername}
          />

          <label htmlFor="password">Password:</label>
          <input
          type="password"
          id="password"
          placeholder="Enter Password"
          onChange={this.onPassword}
          />
          <button type="button" onClick={this.login}>Login</button>
        </form>
      </div>
    );
  }
    return (
      <h1>HELLO!</h1>
    );
  }
}

const domContainer = document.querySelector('#login_container');
ReactDOM.render(el(LoginButton), domContainer);
