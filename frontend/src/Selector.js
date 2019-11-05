import React from 'react';

// Component that controls which page is visible, such as people or calender
class Selector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page:"calendar"
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
        return(
            <div className="selectorDiv">
                <ul style={listStyle}>
                    <li onClick={() => this.changePage("calendar")} >Calendar</li>
                    <li onClick={() => this.changePage("people")} >People</li>
                </ul>
            </div>
        );
    }
    

}


export default Selector;