import React from 'react';
import {userToken} from './Login';
import {updateLoginState} from './MessageStore';




// Should eventually list all people as well as have a button to show the create person component
// should have button to email person component
// should have button to update person component, however that is implemented, could be part of create person component
// should have option to delete component, or add shift to component
class People extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current:"",
            allPeople:""
        };

        this.changePerson = this.changePerson.bind(this);
    }

changePerson(person) {
    this.setState({current:person});
}

componentDidMount() {
    fetch("http://localhost/user/getAllPeople", {
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
            this.setState({allPeople:data});
        }
    })
}

getInfo(){
    
}

render() {

    var list = [];
    
    if (this.state.allPeople.length > 0)
    {
        for (var i = 0; i < this.state.allPeople.length; i++) {
            var text = this.state.allPeople[i].first_name + " " + this.state.allPeople[i].last_name +
            "\n" + this.state.allPeople[i].phone_number
            list.push(<li key={i}><button onClick = {this.getInfo}>{text}</button></li>)
        }
    }

    return(
        <div>
            <h1>People!</h1>
            <ul>
                {list}
            </ul>
        </div>
    );
}

}

export default People;