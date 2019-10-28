import React from 'react';
import Calendar from 'react-calendar';

class CalendarWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
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
