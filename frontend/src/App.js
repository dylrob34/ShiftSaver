import React from 'react';
import logo from './logo.svg';
import './App.css';
import Calendar from './Calendar.js';
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
    this.state.setState({loggedIn:e});
  }

  render() {
    let toView;
    if (!this.loggenIn) {
      toView = <Login onLoggedIn={this.onLogin}/>;
    } else {
      toView =  <Calendar />
    }

    return (
      <div>
        {toView}
      </div>
    );

  }

}

export default ShiftSaver;
