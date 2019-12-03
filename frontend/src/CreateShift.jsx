import React from "react";
import { updateLoginState } from './MessageStore';
import { userToken } from './Login';

class CreateShift extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: null,
            start: "",
            end: "",
            empoloyee: ""
        }

        this.onDate = this.onDate.bind(this);
        this.onStart = this.onStart.bind(this);
        this.onEnd = this.onEnd.bind(this);
        this.onEmployee = this.onEmployee.bind(this);
        this.create = this.create.bind(this);
    }

    onDate(e) {
        e.preventDefault();
        this.setState({date: e.target.value});
    }

    onStart(e) {
        e.preventDefault();
        this.setState({start: e.target.value});
    }

    onEnd(e) {
        e.preventDefault();
        this.setState({end: e.target.value});
    }

    onEmployee(e) {
        e.preventDefault();
        this.setState({empoloyee: e.target.value});
    }

    create() {
        fetch("http://localhost/shift/create", {
        method:"POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: "Bearer " + userToken
        },
        body: JSON.stringify({
            date: this.state.date,
            start: this.state.start,
            end: this.state.end,
            employee: this.state.employee
        })
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.loggedIn === false) {
          updateLoginState(false);
      } else {
          this.props.cancel();
      }
      })
      .catch((err) => {
        console.log("Error: unable to connect to server");
      })
        this.props.cancel();
    }

    render() {
        return (
            <div>
                <h1>Create Shift</h1>
                <input type="text" onChange={this.onDate} placeholder="Enter Date"></input>
                <input type="text" onChange={this.onStart} placeholder="Enter Start Time"></input>
                <input type="text" onChange={this.onEnd} placeholder="Enter End Time"></input>
                <input type="text" onChange={this.onEmployee} placeholder="Enter Employee ID"></input>
                <button onClick={this.create}>Create</button>
                <button onClick={this.props.cancel}>Cancel</button>
            </div>
        );
    }
}

export default CreateShift;