import React from 'react';
import './static/css/Registration.css';

export class Registration extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            employeeID: "",
            firstName: "",
            lastName: "",
            middleInitila: "",
            job: "",
            phone: "",
            email: "",
            userName: "",
            password: "",
            accountType: false,
        };
        this.onSelectingAccType = this.onSelectingAccType.bind(this);
        this.onFirstName = this.onFirstName.bind(this)
        this.onLastName = this.onLastName.bind(this)
        this.onMiddleInitial = this.onMiddleInitial.bind(this)
        this.onJobTitle = this.onJobTitle.bind(this)
        this.onPhoneNumber = this.onPhoneNumber.bind(this)
        this.onEmail = this.onEmail.bind(this)
        this.onEmplyeeID = this.onEmplyeeID.bind(this)
        this.onUserName = this.onUserName.bind(this)
        this.onPassword = this.onPassword.bind(this)
    }

    onEmplyeeID(e){
      e.preventDefault();
      this.setState({ userName: e.target.value });
    }

    onSelectingAccType(e){
      e.preventDefault();

      var type = e.target.value;

      if (type === "manger" ){
        this.setState({ accountType: true })
      }
      else {
        this.setState({ accountType: false })
      }
    }

    onFirstName(e){
      e.preventDefault();
      this.setState({ firstName: e.target.value });
    }

    onLastName(e){
      e.preventDefault();
      this.setState({ lastName: e.target.value });
    }

    onMiddleInitial(e){
      e.preventDefault();
      this.setState({ middleInitila: e.target.value });
    }
    onJobTitle(e){
      e.preventDefault();
      this.setState({ job: e.target.value });
    }

    onPhoneNumber(e){
      e.preventDefault();
      this.setState({phone: e.target.value})
    }

    onEmail(e){
      e.preventDefault();
      this.setState({ emai: e.target.value });
    }

    onUserName(e){
      e.preventDefault();
      this.setState({userName: e.target.value})
    }

    onPassword(e){
      e.preventDefault();
      this.setState({ password: e.target.value });
    }

    createAccount(){

      return fetch("http://localhost/auth/createAccount", {
        method:"POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            employeeID: this.employeeID,
            firstName: this.firstName,
            lastName: this.lastName,
            middleInitila: this.middleInitila,
            job: this.job,
            phone: this.phone,
            email: this.email,
            userName: this.userName,
            password: this.password,
            accountType: this.accountType,
        })
      })
      .then((response) => response.json())
      .catch((err) => {
        console.log("Error: unable to connect to server");
      })
      
    }

    render(){

        return(
        <div className ="regiDiv">

            
            <h1>Create an Account</h1>
            
            <form className= "regiForm">

              <p>Account Type</p>
              <select className="regiSelect" id = "selcAcc" onChange = {this.onSelectingAccType}>
                <option value="none" selected disabled hidden> 
                Select Account Type
                </option> 
                <option className="accType" value = "manger">Manager</option>
                <option className="accType" value = "employee">Employee</option>
              </select>

              <p>Employee ID</p>
              <input 
              type="text"
              id="userEmployeeID"
              placeholder="Enter Employee ID"
              onChange = {this.onEmplyeeID}
              />

              <p>First Name</p>
              <input 
              type="text"
              id="firstName"
              placeholder="Enter First Name"
              onChange = {this.onFirstName}
              />

              <p>Last Name </p>
              <input 
              type="text"
              id="lastName"
              placeholder="Enter Last Name"
              onChange = {this.onLastName}
              />

              <p>Middle Initial</p>
              <input 
              type="text"
              id="Middle Initial"
              placeholder="Enter Middle Initial"
              onChange = {this.onMiddleInitial}
              />

              <p>Job Tittle</p>
              <input 
              type="text"
              id="job"
              placeholder="Enter Job Tittle"
              onChange = {this.onJobTitle}
              />

              <p>Phone Number</p>
              <input 
              type="text"
              id="phone"
              placeholder="Enter Phone Number"
              onChange = {this.onPhoneNumber}
              />

              <p>Email</p>
              <input 
              type="text"
              id="email"
              placeholder="Enter Email"
              onChange = {this.onEmail}
              />

              <p>User Name</p>
              <input 
              type="text"
              id="userName"
              placeholder="Enter User Name"
              onChange = {this.onUserName}
              />

              <p>Password</p>
              <input 
              type="text"
              id="userName"
              placeholder="Enter Password"
              onChange = {this.onPassword}
              />

              <br />
              <br />
              <button className= "regiBtn" onClick = {this.createAccount}>Create Account !</button>


            </form>

            
        </div>
        )
    }
}

export default Registration