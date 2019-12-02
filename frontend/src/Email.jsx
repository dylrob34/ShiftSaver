import React from 'react';
import { userToken } from './Login';
import { updateLoginState } from './MessageStore';

class Email extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    send() {
        fetch("http://localhost/user/getAllPeople", {
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
                    this.setState({ allPeople: data });
                }
            })
    }

    render() {
        return (
            <div>
                <p>Email to: {this.props.to}</p>
                <p>Subject: </p>
                    <input default="Enter Subject" type="text"></input>
                <p>Content: </p>
                    <input default="Enter Content" type="text"></input>
                <button onClick={this.send}>Send</button>
                <button onClick={this.props.discard}>Discard</button>
            </div>
        )
    }
}

export default Email;