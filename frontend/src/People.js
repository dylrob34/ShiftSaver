import React from 'react';

class People extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current:""
        };

        this.changePerson = this.changePerson.bind(this);
    }

changePerson(person) {
    this.setState({current:person});
}

render() {
    return(
        <h1>People!</h1>
    );
}

}

export default People;