import React from 'react';
import Calendar from './react calendar/Calendar';

class CalendarWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      dates: {
        one: new Date("2019", 11, 5),
        two: new Date("2019", 11, 7)
      }
    }
  }

  onChange = date => this.setState({ date })

  render() {
    return (
      <div className="calendarDiv">
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
        />
      </div>
    );
  }
}

export default CalendarWidget;
