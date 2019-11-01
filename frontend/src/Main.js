import React from 'react';
import Calendar from './Calendar';
import './static/css/Main.css';
import Selector from "./Selector";
import Navigation from "./Navigation";
import {userToken} from './login.js';

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
                authorization: "Bearer " + userToken 
              }
        })
        .then((response) => response.json())
        .then((data) => {
            this.setState({name:data.name});
        })
    }

    test() {
        console.log("testing");
        
    }

    render() {
        return (
          <div className="mainDiv">
            <Navigation name={this.state.name}/>
            <Selector />
            <Calendar />

            <button onClick={this.test}>test this shit out</button>

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
