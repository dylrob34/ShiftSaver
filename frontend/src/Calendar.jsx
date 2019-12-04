import "./static/css/Calendar.css";

import React from 'react';
import Calendar from './react calendar/Calendar';
import Day from './Day.jsx';
import CreateShift from "./CreateShift";
import { updateLoginState } from './MessageStore';
import { userToken } from './Login';

class CalendarWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      canCreate: false,
      view: "calendar",
      date: new Date(),
      upcoming: null,
      dates: null,
      day: new Date()
    }

    this.back = this.back.bind(this);
    this.createShift = this.createShift.bind(this);
    this.update = this.update.bind(this);
    this.onChange = this.onChange.bind(this);
    this.getCanCreate = this.getCanCreate.bind(this);

    this.getCanCreate();
    this.update();

  }

  update() {
    fetch("http://24.228.154.163:81/shift/upcomingShifts", {
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


    fetch("http://24.228.154.163:81/shift/monthlyShifts", {
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

  getCanCreate() {
    fetch("http://24.228.154.163:81/user/isManager", {
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
          if (data.response) {
            this.setState({canCreate: data.response});
          } else {
            this.setState({canCreate: false});
          }
        }
      })
  }

  onChange = date => {
    this.setState({ view: "day", day: date });
  }

  back() {
    this.update();
    this.setState({ view: "calendar" });
  }

  createShift() {
    this.setState({view: "create"});
  }

  render() {
    var view;
    if (this.state.view === "create") {
      view = <CreateShift cancel={this.back} />
    } else if (this.state.view === "day") {
      view = <Day back={this.back} day={this.state.day} update={this.update}/>
    } else {
      view = [];
      view.push(<Calendar
        onChange={this.onChange}
        value={this.state.date}
        dates={this.state.dates}
      />);
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

    if (this.state.canCreate && this.state.view === "calendar") {
      view.push(<button onClick={this.createShift}>Create Shift</button>)
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
