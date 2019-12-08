import React from 'react';
import './static/css/Registration.css';
import { userToken } from "./Login";
import { updateLoginState } from "./MessageStore";

export class Registration extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            employeeID: "",
            firstName: "",
            lastName: "",
            middleInitial: "",
            job: "",
            phone: "",
            email: "",
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
        this.onEmployeeID = this.onEmployeeID.bind(this)
        this.onPassword = this.onPassword.bind(this)
        this.createAccount = this.createAccount.bind(this);
    }

    onEmployeeID(e){
      e.preventDefault();
      this.setState({ employeeID: e.target.value });
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
      this.setState({ middleInitial: e.target.value });
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
      this.setState({ email: e.target.value });
    }

    onPassword(e){
      e.preventDefault();
      this.setState({ password: e.target.value });
    }

    createAccount(){
      fetch("http://localhost/user/create", {
        method:"POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: "Bearer " + userToken
        },
        body: JSON.stringify({
            employee_id: this.state.employeeID,
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            middle_initial: this.state.middleInitial,
            job_title: this.state.job,
            phone: this.state.phone,
            email: this.state.email,
            password: this.state.password,
            manager: this.state.accountType,
            admin: 0,
        })
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.loggedIn === false) {
          updateLoginState(false);
        } else {
          this.props.back();
        }
      })
      .catch((err) => {
        console.log("Error: unable to connect to server");
      })
      
    }

    render(){

        return(
        <div className ="main_div">

            
            <h1 className = "title">Create an Account</h1>
            
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
              className = "txt_area" 
              type="text"
              id="userEmployeeID"
              placeholder="Enter Employee ID"
              onChange = {this.onEmployeeID}
              />

              <p>First Name</p>
              <input
              className = "txt_area" 
              type="text"
              id="firstName"
              placeholder="Enter First Name"
              onChange = {this.onFirstName}
              />

              <p>Last Name </p>
              <input
              className = "txt_area" 
              type="text"
              id="lastName"
              placeholder="Enter Last Name"
              onChange = {this.onLastName}
              />

              <p>Middle Initial</p>
              <input
              className = "txt_area" 
              type="text"
              id="Middle Initial"
              placeholder="Enter Middle Initial"
              onChange = {this.onMiddleInitial}
              />

              <p>Job Tittle</p>
              <input
              className = "txt_area" 
              type="text"
              id="job"
              placeholder="Enter Job Tittle"
              onChange = {this.onJobTitle}
              />

              <p>Phone Number</p>
              <input
              className = "txt_area" 
              type="text"
              id="phone"
              placeholder="Enter Phone Number"
              onChange = {this.onPhoneNumber}
              />

              <p>Email</p>
              <input
              className = "txt_area" 
              type="text"
              id="email"
              placeholder="Enter Email"
              onChange = {this.onEmail}
              />

              <p>Password</p>
              <input
              className = "txt_area" 
              type="text"
              id="userName"
              placeholder="Enter Password"
              onChange = {this.onPassword}
              />

              <br />
              <br />


              <button className= "sub_btn" type= "button" onClick = {this.createAccount}>Create Account !</button>
              <button className= "sub_btn" type= "button" onClick = {this.props.back}>Cancel</button>


            </form>

            
        </div>
        )
    }
}

export default Registration