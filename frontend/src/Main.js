import React from 'react';
import Calendar from './Calendar';
import './static/css/Main.css';
import Selector from "./Selector";
import Navigation from "./Navigation";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:""
        };
    }
    
    componentDidMount() {
        fetch("http://localhost/user/getMyName", {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZV9pZCI6IjEyMzQiLCJpYXQiOjE1NzI0NTIwMzIsImV4cCI6MTU3MjQ1OTIzMn0.UG14XaPPvmlZD3AtoddNLHwrhYvuEAOBaEUL-DLKbIw"
              }
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("data:", data);
            console.log("name", data.name);
            this.setState({name:data.name});
        })
    }

    render() {

        return (
          <div className="mainDiv">
            <Navigation name={this.state.name}/>
            <Selector />
            <Calendar />

            <div className="upcomingShiftsDiv">
                <h1>Upcoming Shifts</h1>
                <ul>
                    <li>list for the next 2? weeks of upcoming shifts</li>
                </ul>
            </div>
          </div>
        );
    }

}

export default Main;