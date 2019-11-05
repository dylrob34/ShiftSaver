import React from 'react';
import Calendar from './Calendar';
import './static/css/Main.css';
import Selector from "./Selector";
import Navigation from "./Navigation";
import {userToken} from './login.js';

// The main page, gets shown when the user is logged in.
// The rest of the app are children of this component
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:""
        };
    }
    
    // "componentDidMount()" gets run when a component is loaded onto the screen, this method gets the name of the current user
    // from the backend and displays a greeting.
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
