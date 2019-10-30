import React from "react";
import {updateLoginState} from './MessageStore';

class Navigation extends React.Component {

    logout() {
        updateLoginState(false);
    }


    render() {
        return(
            <div>
                <h1>Hello {this.props.name}!</h1>

                <button onClick={this.logout}>
  Logout
</button>
                
            </div>
        );
    }
}

export default Navigation;