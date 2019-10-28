import React from 'react';

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
        return(
            <ul style={{ "list-style-type":"none" }}>
                <li onClick={() => this.changePage("calendar")} >Calendar</li>
                <li onClick={() => this.changePage("people")} >People</li>
            </ul>
        );
    }
    

}


export default Selector;