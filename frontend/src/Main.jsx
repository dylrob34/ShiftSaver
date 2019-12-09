import React from 'react';
import './static/css/Main.css';
import Selector from "./Selector";
import {userToken} from './Login';
import {updateLoginState} from './MessageStore';

// The main page, gets shown when the user is logged in.
// The rest of the app are children of this component
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:""
        };
        fetch("http://24.228.154.163:81/user/getMyName", {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: "Bearer " + userToken 
              }
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.loggedIn === false) {
                updateLoginState(false);
            } else {
                this.setState({name:data.name});
            }
        })
    }

    render() {
        return (
          <div className="mainDiv">
            <Selector name={this.state.name}/>
          </div>
        );
    }

}

export default Main;
