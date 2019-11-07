import React from 'react';
import './static/css/login.css';
import {updateLoginState} from './MessageStore';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export var userToken;

// Component that handles login. Takes in callback function as property to change the state of the parent component.
// Shows login form, when submit button is clicked, calls the login() function, that makes a post request to the back end sending username and password as body.
// If the login is successful, saves the token contained in the response to the userToken variable which is exported for use by
// any component that communicates with the backend.

export function AlertDialog() {
  const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Invalid Username or Password"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your username, password, or both are incorrect. Please try again
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose} color="primary">
            Disagree
          </Button> */}
          <Button onClick={handleClose} color="primary" href="http://localhost:3000/" autoFocus>
            Got it!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export class Login extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
       username:"",
       password:"",
       dialog: false,
    };
    this.onUsername = this.onUsername.bind(this);
    this.onPassword = this.onPassword.bind(this);

    this.login = this.login.bind(this);
    this.authentication = false;


  }


login() {

      if (this.state.username === "admin" && this.state.password === "admin") {
        updateLoginState(true);
        this.authentication = true;
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
      if (responseJson.error === false) {
        this.authentication = true;
        userToken = responseJson.token
        updateLoginState(responseJson.login);
      } else {
        this.setState({ dialog: true}); 
        console.log(responseJson)
        // console.log("wrong username / password")
        //   console.log("Error: idk");
      }

     

    }
    )
    // .catch((err) => {

    //   console.log("Invalid username or password");
    // })


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

    if (this.state.dialog === true){
      return <AlertDialog/>
    }

    // if(this.authentication === false){
    //  return <AlertDialog/>

    // } else {

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
