import React from 'react';
import {userToken} from './Login';
import {updateLoginState} from './MessageStore';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current:"",
            currentUser:"",
        };

        this.changePerson = this.changePerson.bind(this);
    }

changePerson(person) {
    this.setState({current:person});
}

componentDidMount() {
    fetch("http://localhost/user/getCurrentUser", {
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
            this.setState({currentUser:data});
        }
    })
}

getInfo(){
    
}

render() {

    var jsonUser = this.state.currentUser;
   

    return(
        <div>
            <p1>{jsonUser}</p1>
        </div>
    );
}

}

export default Profile;