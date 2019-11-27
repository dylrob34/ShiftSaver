import React from 'react';
import Calendar from "./Calendar";
import People from "./People";
import Profile from "./Profile";

// Component that controls which page is visible, such as people or calender
class Selector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page:"calendar",
            day: new Date()
        };
        this.changePage = this.changePage.bind(this);
    }

    changePage(page) {
        this.setState({page});
    }


    render() {
        var listStyle = {
            listStyleType:"none"
        };

        var content;
        if (this.state.page === "calendar") {
            content = <Calendar />
        } else if (this.state.page === "people") {
            content = <People />
        } else if (this.state.page === "profile"){
            content = <Profile />
        }
        return(
            <div className="selectorDiv">
                <ul style={listStyle}>
                    <li onClick={() => this.changePage("calendar")} >Calendar</li>
                    <li onClick={() => this.changePage("people")} >People</li>
                    <li onClick={() => this.changePage("profile")} >Profile</li>
                </ul>
                <div>
                    {content}
                </div>
            </div>
        );
    }
    

}


export default Selector;