import "./static/css/Day.css";

import React from "react";
import { userToken } from "./Login";
import { updateLoginState } from "./MessageStore";


class Day extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shifts: "No Shifts",
            id: "",
        }

        this.getShifts = this.getShifts.bind(this);
        this.deleteShift = this.deleteShift.bind(this);
        this.assignShift = this.assignShift.bind(this);
        this.onID = this.onID.bind(this);

        this.getShifts();

    }

    getShifts() {
        const day = this.props.day.getFullYear() + "-" + (this.props.day.getMonth() + 1) + "-" + this.props.day.getDate();
        fetch("http://localhost/shift/day", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: "Bearer " + userToken
            },
            body: JSON.stringify({
                day
            })
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.loggedIn === false) {
                    updateLoginState(false);
                } else {
                    if (data.shifts.length > 0) {
                        this.setState({ shifts: data.shifts });
                    } else {
                        this.setState({ shifts: "No Shifts" });
                    }
                }
            })
    }

    deleteShift(shift) {
        fetch("http://localhost/shift/delete", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: "Bearer " + userToken
            },
            body: JSON.stringify({
                shift_id: this.state.shifts[shift - 1].shift_id
            })
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.loggedIn === false) {
                    updateLoginState(false);
                } else {
                    this.getShifts();
                }
            })
    }

    assignShift(shift) {
        fetch("http://localhost/shift/update", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: "Bearer " + userToken
            },
            body: JSON.stringify({
                shift_id: this.state.shifts[shift - 1].shift_id,
                employee: this.state.id
            })
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.loggedIn === false) {
                updateLoginState(false);
            }      
        })
        this.getShifts();
    }

    onID(e) {
        e.preventDefault();
        this.setState({ id: e.target.value });
    }

    render() {
        var hours = [];
        var date = new Date();
        date.setHours(7);
        for (var i = 0; i < 17; i++) {
            hours.push(<li key={i}>{date.getHours()}</li>)
            date.setHours(date.getHours() + 1);
        }

        var shifts = [];
        if (this.state.shifts === "No Shifts") {
            shifts.push(
                <li><h1>{this.state.shifts} today</h1></li>
            )
        } else {
            for (i = 0; i < this.state.shifts.length; i++) {
                shifts.push(
                    <li key={i}><p>{this.state.shifts[i].employee_id}: {this.state.shifts[i].start_time}-{this.state.shifts[i].end_time}</p>
                        <button onClick={() => this.deleteShift(i)}>Delete</button>
                        <button onClick={() => this.assignShift(i)}>Assign</button>
                        <input type="text" placeholder="Enter Employee ID" onChange={this.onID}></input>
                    </li>
                )
            }
        }

        return (
            <div className="dayDiv" >
                <div className="hoursDiv">
                    <ul style={{ "listStyleType": "none" }}>
                        {shifts}
                    </ul>
                </div>
                <div className="otherDiv">
                    <h3 onClick={this.props.back}>Month</h3>
                </div>
            </div>
        )
    }
}

export default Day;