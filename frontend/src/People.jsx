import React from 'react';
import './static/css/People.css';
import { userToken } from './Login';
import { updateLoginState } from './MessageStore';
import Registration from "./Registration";
import Email from "./Email";




// Should eventually list all people as well as have a button to show the create person component
// should have button to email person component
// should have button to update person component, however that is implemented, could be part of create person component
// should have option to delete component, or add shift to component
class People extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: "",
            allPeople: "",
            isSelected: false,
            addPerson: false,
            email: null
        };

        this.changePerson = this.changePerson.bind(this);
        this.selectPerson = this.selectPerson.bind(this);
        this.email = this.email.bind(this);
        this.assignShift = this.assignShift.bind(this);
        this.discard = this.discard.bind(this);
        this.infoSection = this.infoSection.bind(this);


    }

    changePerson(n) {
        this.setState({ current: this.state.allPeople[n]});//assigns n-th employee to state current
        this.selectPerson();
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
                    this.setState({ allPeople: data });
                }
            })
    }

    selectPerson() {
        this.setState({ isSelected: true });
    }

    discard() {
        this.setState({email: null});
    }

    email() {
       // apply Lucas's function using "this.state.current.email" as an email to be sent to 
       this.setState({email: this.state.current.email});
        //alert(this.state.current.email); 
    }

    assignShift() {
        //use this.state.current.employee_id to assign shifts
        alert(this.state.current.employee_id);        
    }

    infoSection() {
        this.setState({addPerson: true});
    }


    render() {

        var list = [];

        if (this.state.allPeople.length > 0) {
            for (var i = 0; i < this.state.allPeople.length; i++) {
                var text = this.state.allPeople[i].first_name + " " + this.state.allPeople[i].last_name +
                    "\n" + this.state.allPeople[i].phone_number
                list.push(<li key={i}><button value={i} onClick={e => this.changePerson(e.target.value)}>{text}</button></li >)
             }
        }

        var info;

        if(!this.state.addPerson) {
            info = 
            <div>
                <h1>{this.state.current.first_name} {this.state.current.last_name}</h1>
                <br/>
                <h3>Phone Number: {this.state.current.phone_number}</h3>
                <h3>Email: {this.state.current.email}</h3>
                <h3>Employee ID: {this.state.current.employee_id}</h3>
            </div>
        }else{
            info = <Registration />
        }

        var email;
        
        if (this.state.email != null) {
            email = <Email discard={this.discard} to={this.state.email} />;
        }

        return (
                <div>
                <h1>People!</h1>
                <ul>
                    {list}
                </ul>
                
                <div className={this.state.isSelected ? "show" : "invisible"} >
                    <p>Contact or assign shifts to {this.state.current.first_name} {this.state.current.last_name}: </p>
                    <Email discard={this.discard} to={this.state.email} />
                    <button onClick={this.email}>Email</button>
                    <button onClick={this.assignShift}>Assign Shifts</button>  
                    {info}                  
                    </div>
                </div>
        );
    }

}

export default People;