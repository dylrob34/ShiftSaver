import "./static/css/Day.css";

import React from "react";


class Day extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        var hours = [];
        var date = new Date();
        date.setHours(7);
        for(var i = 0; i < 17; i++) {
            hours.push(<li key={i}>{date.getHours()}</li>)
            date.setHours(date.getHours() + 1);
        }

        return (
            <div className="dayDiv" >
                <div className="hoursDiv">
                    <ul style={{"listStyleType": "none"}}>
                        {hours}
                    </ul>
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