import React from 'react';
import './static/css/People.css';
import { userToken } from './Login';
import { updateLoginState } from './MessageStore';




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
            isSelected: false
        };

        this.changePerson = this.changePerson.bind(this);
        this.selectPerson = this.selectPerson.bind(this);


    }

    changePerson(person) {
        this.setState({ current : person});
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

    email() {
        //alert(this.state.current)
        //var JSONobj = JSON.parse(this.state.current);
        //alert(JSONobj.first_name);
        
    }

    assignShift() {
        
    }


    render() {

        var list = [];

        if (this.state.allPeople.length > 0) {
            for (var i = 0; i < this.state.allPeople.length; i++) {
                var text = this.state.allPeople[i].first_name + " " + this.state.allPeople[i].last_name +
                    "\n" + this.state.allPeople[i].phone_number
               // list.push(<li key={i}><button onClick={() => this.changePerson(JSON.stringify(this.state.allPeople[document.getElementsByTagName('ul').closest('li').attr("key")]))}>{text}</button></li >)
                list.push(<li key={i}><button onClick={this.selectPerson}>{text}</button></li >)
            }
        }

        return (
                <div>
                <h1>People!</h1>
                <ul>
                    {list}
                </ul>
                
                <div className={this.state.isSelected ? "show" : "invisible"} >
                    <p>Contact or assign shifts to selected employee:</p>
                    <button onClick={this.email}>Email</button>
                    <button onClick={this.assignShift}>Assign Shifts</button>                    
                    </div>
                </div>
        );
    }

}

export default People;