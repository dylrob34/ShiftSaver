import React from 'react';
import Calendar from './Calendar';
import './Main.css';

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div className="mainDiv">
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