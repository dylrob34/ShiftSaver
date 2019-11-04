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
    this.state.register ? this.setState({register:false}):this.setState({register:true});
  }

  render() {

    if (!this.state.register) {
        return (
            <div>
            <button onClick={this.onRegister} >Register</ button>
            <Login onLoggedIn={this.onLogin}/>
          </div>
        );
    } else {
      return (
        <div>
          <button onClick={this.onRegister} >Register</button>
          <Registration />
        </div>
      )
    }

  }

}

export default ShiftSaver;
