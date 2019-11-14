import React from 'react';
import Calendar from './react calendar/Calendar';

class CalendarWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      dates: [
        new Date("2019", 10, 5),
        new Date("2019", 10, 7)]
    }
  }

  onChange = date => {
    this.setState({ date })
  }

  render() {
    return (
      <div className="calendarDiv">
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
          dates={this.state.dates}
        />
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
