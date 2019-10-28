import React from 'react';
import Calendar from './Calendar';
import './static/css/Main.css';
import Selector from "./Selector";

class Main extends React.Component {

    render() {
        return (
          <div className="mainDiv">
              <div>
                  <Selector />
              </div>
              <div className="calendarDiv">
                  <Calendar />
              </div>

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