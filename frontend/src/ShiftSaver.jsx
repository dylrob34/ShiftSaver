import React from 'react';
import './static/css/App.css';
import Main from './Main';
import Login from "./Login"
import {subscribe, getLoginState} from './MessageStore';

// The Highest level of the application that does anything meaningfull. Displays the login page when the state of loggedIn is false.
// Otherwise shows main page.
// The <Login /> component takes a property called onLoggedIn. This property is a callback to the onLogin function that changes the state of this ShiftSaver component to whatever is given as an argument.
// Argument should be true or false.
class ShiftSaver extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
    }
    this.onLogin = this.onLogin.bind(this);
    subscribe(this.onLogin);  // This subscribes to the global loggedIn state of our application in the MessageStore.js file
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
