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
            canCreate: false,
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
        this.getCanCreate = this.getCanCreate.bind(this);
        this.back = this.back.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);

        this.getCanCreate();
        this.update();
        
        
    }

    update() {
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
                    this.setState({ allPeople: data, isSelected: true });
                    this.setState({ current: this.state.allPeople[0]});
                }
            })
    }

    changePerson(n) {
        this.setState({ current: this.state.allPeople[n] });//assigns n-th employee to state current
        this.selectPerson();
    }

    selectPerson() {
        this.setState({ isSelected: true });
        this.setState({ addPerson: false });
    }

    discard() {
        this.setState({ email: null });
    }

    back() {
        this.setState({addPerson: false});
        this.update();
    }

    email() {
        // apply Lucas's function using "this.state.current.email" as an email to be sent to 
        this.setState({ email: this.state.current.email });
        //alert(this.state.current.email); 
    }

    assignShift() {
        //use this.state.current.employee_id to assign shifts
        alert(this.state.current.employee_id);
    }

    infoSection() {
        this.setState({ addPerson: true });
    }

    delete() {
        fetch("http://localhost/user/delete", {
            method: "POST",
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: "Bearer " + userToken
          },
          body: JSON.stringify({
              user: this.state.current.employee_id
          })
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.loggedIn === false) {
              updateLoginState(false);
            } else {
              this.update();
            }
          })
    }

    getCanCreate() {
        fetch("http://localhost/user/isManager", {
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
              if (data.response) {
                this.setState({canCreate: data.response});
              } else {
                this.setState({canCreate: false});
              }
            }
          })
      }


    render() {

        var list = [];

        if (this.state.allPeople.length > 0) {
            for (var i = 0; i < this.state.allPeople.length; i++) {
                var text = this.state.allPeople[i].first_name + " " + this.state.allPeople[i].last_name +
                    "\n" + this.state.allPeople[i].phone_number
                list.push(<li className = "list"key={i}><button className = "btn_list" value={i} onClick={e => this.changePerson(e.target.value)}>{text}</button></li >)
            }
        }

        var info;

        if(!this.state.addPerson){
            info = 
                <div className = "info">    
                <h1>{this.state.current.first_name} {this.state.current.last_name}</h1>
                <br/>
                <h3>Phone Number: {this.state.current.phone_number}</h3>
                <h3>Email: {this.state.current.email}</h3>
                <h3>Employee ID: {this.state.current.employee_id}</h3>
                </div>
                
        }else{
            info = <Registration back={this.back} />
        }

        var email;

        if (this.state.email != null) {
            email = <Email discard={this.discard} to={this.state.email} />;
        }

        return (
            <div>
                <h1 className = "label">People!</h1>
                {this.state.canCreate &&
               <h2><button className= "add_btn" onClick={this.infoSection}>Add Employee</button></h2>
                }
                <div className = "contDiv">
                <ul className = "btn_group">
                    {list}
                </ul>
                <div className="email_sec" >
                <p>Contact {this.state.current.first_name} {this.state.current.last_name}: </p>
                <button className="cont_btn" onClick={this.email}>Email</button>
                
                {email}
                </div>

                { this.state.canCreate &&
                    <div className="email_sec" >
                    <p>Delete {this.state.current.first_name} {this.state.current.last_name}: </p>
                    <button className="cont_btn" onClick={this.delete}>Delete</button>
                    </div>
                }                

                </div>


                <div className = "infoPos">
                {info}
                </div>
            </div>
        );//<button className="cont_btn" onClick={this.assignShift}>Assign Shifts</button>
    }

}

export default People;