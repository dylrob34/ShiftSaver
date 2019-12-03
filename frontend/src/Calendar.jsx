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
      dates: null
    }

    this.back = this.back.bind(this);


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
          if (data.shifts.length > 0) {
            this.setState({ upcoming: data.shifts });
          }
        }
      })
      .catch((err) => {
        console.log("error:", err);
      })


    fetch("http://localhost/shift/monthlyShifts", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: "Bearer " + userToken
      },
      body: JSON.stringify({
        month: new Date().getMonth()
      })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.loggedIn === false) {
          updateLoginState(false);
        } else {
          if (data.shifts.length > 0) {
            var dates = [];
            for (var i = 0; i < data.shifts.length; i++) {
              dates.push(new Date(data.shifts[i].shift_date));
            }
            this.setState({ dates });
          }
        }
      })

  }

  onChange = date => {
    this.setState({ view: "day" })
  }

  back() {
    this.setState({ view: "calendar" });
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
      view = <Day back={this.back} />
    }

    var upcoming = [];
    if (this.state.upcoming != null) {
        for (var i = 0; i < this.state.upcoming.length; i++) {
            var text = this.state.upcoming[i].day + " the " + this.state.upcoming[i].mydate + ", " + this.state.upcoming[i].start + "-" + this.state.upcoming[i].end;
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
