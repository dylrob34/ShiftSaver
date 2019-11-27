import "./static/css/Calendar.css";

import React from 'react';
import Calendar from './react calendar/Calendar';
import Day from './Day.jsx';

class CalendarWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: "calendar",
      date: new Date(),
      dates: [
        new Date("2019", 10, 5),
        new Date("2019", 10, 7)]
    }

    this.back = this.back.bind(this);

  }

  onChange = date => {
    this.setState({ view: "day" })
  }

  back() {
    this.setState({view: "calendar"});
  }

  render() {
    var view;
    if (this.state.view === "calendar") {
      view = <Calendar
             onChange={this.onChange}
             value={this.state.date}
             dates={this.state.dates}
             />
    } else {
      view = <Day back={this.back}/>
    }

    return (
      <div className="calendarDiv">
        {view}
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

export default CalendarWidget;
