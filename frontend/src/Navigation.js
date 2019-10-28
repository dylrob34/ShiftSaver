import React from "react";

class Navigation extends React.Component {
    render() {
        return(
            <div>
                <h1>Hello {this.props.name}!</h1>
                <button>Logout, needs to be implemented</button>
            </div>
        );
    }
}

export default Navigation;