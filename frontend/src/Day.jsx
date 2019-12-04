import "./static/css/Day.css";

import React from "react";
import { userToken } from "./Login";
import { updateLoginState } from "./MessageStore";


class Day extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shifts: "No Shifts",
        }

        this.getShifts = this.getShifts.bind(this);
        this.deleteShift = this.deleteShift.bind(this);

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
            for(var i = 0; i < this.state.shifts.length; i++) {
                shifts.push(
                    <li key={i}><p>{this.state.shifts[i].employee_id}: {this.state.shifts[i].start_time}-{this.state.shifts[i].end_time}</p>
                    <button onClick={() => this.deleteShift(i)}>Delete</button>
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