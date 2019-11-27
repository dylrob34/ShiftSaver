import "./static/css/Day.css";

import React from "react";


class Day extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (
            <div className="dayDiv" >
                <div className="hoursDiv">
                    <p>this is where the hours will go</p>
                </div>
                <div className="otherDiv">
                    <h3 onClick={this.props.back}>Month</h3>
                    <p>Welcome to the day view...this is going to be a disaster</p>
                </div>
            </div>
        )
    }
}

export default Day;