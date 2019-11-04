import React from 'react';
import './static/css/App.css';
import Main from './Main.js';
import Login from './login.js';
import Registration from './Registration.js';


class ShiftSaver extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      register: false
    }
    this.onLogin = this.onLogin.bind(this);
    this.onRegister = this.onRegister.bind(this)
  }

  onLogin(e) {
    this.setState({loggedIn:e});
  }

  onRegister(){
    this.setState({register: true});
  }

  render() {
    var toView = !this.state.loggedIn ? <Login onLoggedIn={this.onLogin}/>:<Main />;
    var showing = !this.state.register ? toView : <Registration />

    return (
      <div>
        <button onClick= {this.onRegister} >Register</ button>
        {showing}
      </div>
    );

  }

}

export default ShiftSaver;
