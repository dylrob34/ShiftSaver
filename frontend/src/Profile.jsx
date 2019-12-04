import React from 'react';
import {userToken} from './Login';
import {updateLoginState} from './MessageStore';
import './static/css/Profile.css';
import EditProfile from './EditProfile';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            middle_init: "",
            last_name: "",
            employee_id: "",
            job_title: "",
            phone_number: "",
            email: "",
            edit: false
        };

        this.changePerson = this.changePerson.bind(this);
        this.editInfo = this.editInfo.bind(this);
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
            this.setState({first_name: data.first_name});
            this.setState({last_name: data.last_name});
            this.setState({middle_init: data.middle_inital});
            this.setState({employee_id: data.employee_id});
            this.setState({job_title: data.job_title});
            this.setState({phone_number: data.phone});
            this.setState({email: data.email});    
        }
    })
}

editInfo(){
    this.setState({edit: true})
}

getInfo(){
    
}

render() {
    var info;

    if (!this.state.edit){
        info = 
            <div className = "profile_main_area">
                <h1>{this.state.first_name} {this.state.last_name}</h1>
                <br/>
                <h3>Employee ID: {this.state.employee_id}</h3>
                <h3>Phone Number: {this.state.phone_number}</h3>
                <h3>Email: {this.state.email}</h3>
                <h3>Job: {this.state.job_title}</h3>
                <br/>
                <br/>
                <button className = "edit_prog_btn" onClick = {this.editInfo}>Edit Profile</button>
            </div>
    }else{
        info = <EditProfile 
                first_name = {this.state.first_name} 
                last_name =  {this.state.last_name}
                employee_id = {this.state.employee_id}
                job_title = {this.state.job_title}
                />
    }
   

    return(
        <div>
        {info}
        </div>
    );
}

}

export default Profile;