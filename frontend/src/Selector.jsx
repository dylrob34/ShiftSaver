import React from 'react';
import Calendar from "./Calendar";
import People from "./People";
import Profile from "./Profile";
import {updateLoginState} from './MessageStore';
import './static/css/Selector.css';


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

    logout() {
        updateLoginState(false);
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

            
            <div className="container">
                <header>
                <h1 className = "logo" >Hello {this.props.name}!</h1>
                <nav>
                <ul style={listStyle}>
                    <li><button onClick={() => this.changePage("calendar")} >Calendar</button></li>
                    <li> <button onClick={() => this.changePage("people")} >People</button></li>
                    <li><button onClick={() => this.changePage("profile")}>Profile</button></li>
                    <li><button onClick={this.logout}>Logout</button></li>
                </ul>
                </nav>
                </header>
                <div className = "display">
                    <div className = "displayItem">
                    {content}
                    </div>
                </div>
            </div>
        );
    }
    

}

//git add/rm <file>
export default Selector;