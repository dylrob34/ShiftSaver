import React from 'react';
import Calendar from "./Calendar";

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
            //content = <People />
        }
        return(
            <div className="selectorDiv">
                <ul style={listStyle}>
                    <li onClick={() => this.changePage("calendar")} >Calendar</li>
                    <li onClick={() => this.changePage("people")} >People</li>
                </ul>
                <div>
                    {content}
                </div>
            </div>
        );
    }
    

}


export default Selector;