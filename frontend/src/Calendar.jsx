import "./static/css/Calendar.css";

import React from 'react';
import Calendar from './react calendar/Calendar';
import Day from './Day.jsx';
import { updateLoginState } from './MessageStore';
import { userToken } from './Login';

class CalendarWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: "calendar",
      date: new Date(),
      upcoming: null,
      dates: [
        new Date("2019", 10, 5),
        new Date("2019", 10, 7)]
    }

    this.back = this.back.bind(this);

  }

  componentDidMount() {
    fetch("http://localhost/shift/upcomingShifts", {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: "Bearer " + userToken
            }
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.loggedIn === false) {
                    updateLoginState(false);
                } else {
                    this.setState({ upcoming: data.shifts });
                }
            })
            .catch((err) => {
              console.log("error:", err);
            })
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

    var upcoming = [];
    if (this.state.upcoming != null) {
      for (var i = 0; i < this.state.upcoming.length; i++) {
        console.log("THE SHIFTS", this.state.upcoming[i]);
        var text = this.state.upcoming[i].shift_date + ", " + this.state.upcoming[i].start_time + "-" + this.state.upcoming[i].end_time;
        upcoming.push(<li key={i}>{text}</li>);
      }
    } else {
      upcoming = <li><p>No upcoming shifts</p></li>;
    }

    return (
      <div className="calendarDiv">
        {view}
        <div className="upcomingShiftsDiv">
                <h1>Upcoming Shifts</h1>
                <ul>
                    {upcoming}
                </ul>
            </div>
      </div>
    );
  }
}

export default CalendarWidget;
