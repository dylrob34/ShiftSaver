import React from "react";

class Navigation extends React.Component {
    render() {
        return(
            <div>
                <h1>Hello {this.props.name}!</h1>
                <button><a href= "/frontend/login.js">Logout, needs to be implemented</a></button>
            </div>
        );
    }
}

export default Navigation;