import React from 'react';
import './static/css/App.css';
import Main from './Main.js';
import Login from "./login"
import {subscribe, getLoginState} from './MessageStore';

class ShiftSaver extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
    }
    this.onLogin = this.onLogin.bind(this);
    console.log("subscribing");
    subscribe(this.onLogin);
  }

  onLogin() {
    const login = getLoginState();
    this.setState({loggedIn:login});
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
