import React from 'react';
import './App.css';
import Main from './Main.js';
import Login from './login.js';

class ShiftSaver extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
    }
    this.onLogin = this.onLogin.bind(this);
  }

  onLogin(e) {
    this.setState({loggedIn:e});
  }

  render() {
    var toView = !this.state.loggedIn ? <Login onLoggedIn={this.onLogin}/>:<Main />;

    return (
      <div>
        {toView}
      </div>
    );

  }

}

export default ShiftSaver;
