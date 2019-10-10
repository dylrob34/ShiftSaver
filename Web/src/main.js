var Calendar = require("./react-calendar/entry.js");

class MyApp extends React.Component {
  state = {
    date: new Date(),
  }

  onChange = date => this.setState({ date })

  render() {
    return (
      <div>
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
        />
      </div>
    );
  }
}

ReactDOM.render(<MyApp />, document.getElementById("calendar_div"));
