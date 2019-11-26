import React from "react";
import {updateLoginState} from './MessageStore';
import './static/css/NavBar.css';

// Navigation bar on the top of the main page. Should always be visible. Takes in a prop with the value of name to be displayed
// as a greeting to the user
// Contains the logout button which when clicked changes the global loggedIn state to false.
// ??? should maybe clear the token from memory ???
class Navigation extends React.Component {

    logout() {
        updateLoginState(false);
    }


    render() {
        return(
            <div className = "container">
                <h1>Hello {this.props.name}!</h1>
                <nav>
                    <li><button onClick={this.logout}>Logout</button></li>
                </nav>
            </div>
        );
    }
}

export default Navigation;