import React from 'react';

// Should eventually list all people as well as have a button to show the create person component
// should have button to email person component
// should have button to update person component, however that is implemented, could be part of create person component
// should have option to delete component, or add shift to component
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