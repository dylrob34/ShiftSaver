import React from 'react';
import { userToken } from './Login';
import { updateLoginState } from './MessageStore';
import './static/css/Email.css';

class Email extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subject: "",
            content: ""
        }

        this.updateContent = this.updateContent.bind(this);
        this.updateSubject = this.updateSubject.bind(this);
        this.send = this.send.bind(this);
    }

    updateSubject(e) {
        e.preventDefault();
        this.setState({subject: e.target.value});
    }

    updateContent(e) {
        e.preventDefault();
        this.setState({content: e.target.value});
    }

    send() {
        fetch("/sendmail", {
            method:"POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: "Bearer " + userToken
            },
            body: JSON.stringify({
                to: this.props.to,
                subject: this.state.subject,
                text: this.state.content,
            })
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.loggedIn === false) {
                    updateLoginState(false);
                } else {
                    this.props.discard();
                }
            })
    }

    render() {
        return (
            <div className = "mainSec">
                <p>Email to: {this.props.to}</p>
                <p>Subject: </p>
                <input className = "sub"placeholder="Enter Subject" type="text" onChange={this.updateSubject}></input>
                <p>Content: </p>
                <textarea className = "tex" placeholder="Enter Content" type="text" onChange={this.updateContent}></textarea>
                <p></p>
                <button onClick={this.send}>Send</button>
                <button onClick={this.props.discard}>Discard</button>
            </div>
        )
    }
}

export default Email;