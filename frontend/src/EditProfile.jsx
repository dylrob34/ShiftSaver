import React from 'react';
import {userToken} from './Login';
import {updateLoginState} from './MessageStore';
import './static/css/Profile.css';
import Profile from './Profile.jsx';


class EditProfile extends React.Component {
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
            done_editing: false,
        };

        this.cancelEdits = this.cancelEdits.bind(this)
        this.changeNum = this.changeNum.bind(this)
        this.chnageEmail = this.chnageEmail.bind(this)

    }

    changeNum(e){
        this.setState({phone_number: e.target.value})
    }

    chnageEmail(e){
        this.setState({email: e.target.value})
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

    cancelEdits(){
        this.setState({done_editing: true})
    }

    editInformation(){
        fetch('http://localhost/user/editProfile', {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: "Bearer " + userToken
              },
              body: JSON.stringify({
                employee_id: this.state.employee_id,
                email: this.state.employee_id,
                phone: this.state.phone_number
              })
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.loggedIn === false) {
              updateLoginState(false);
          }
          })
          .catch((err) => {
            console.log("Error: unable to connect to server");
          });

          this.cancelEdits();
    }


    render(){

        var editing;

        if(!this.state.done_editing){
            editing = 
            <div className = "profile_main_area">
                <h1>{this.state.first_name} {this.state.last_name}</h1>
                <br/>
                <h3>Employee ID: {this.state.employee_id}</h3>
                <h3>Job: {this.state.job_title}</h3>
                <br/>
                <h3>Phone Number:</h3>
                <input 
                className= "edit_area" 
                type="text" placeholder = {this.state.phone_number} 
                name="phone_edit" 
                id="phone_edit"
                onChange = {this.changeNum}
                />
                <br/>
                <h3>Email:</h3>
                <input 
                className= "edit_area" 
                type="text" placeholder = {this.state.email} 
                name="email_edit" 
                id="email_edit"
                onChange = {this.chnageEmail}
                />

                <br/>
                <br/>
                <button className = "edit_prog_btn" onClick = {this.editInformation}>Safe</button>
                <button className= "edit_prog_btn" onClick = {this.cancelEdits}> Cancel</button>
            </div>
        }else{
            editing = <Profile />
        }

        return(
        <div>{editing}</div>
        );
    }
}


export default EditProfile;