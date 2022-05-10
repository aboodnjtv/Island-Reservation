import React from 'react';
import './Signup.css'
import Navbar from '../components/Navbar.js'

class SignUp extends React.Component {
  constructor(props) {
  		super(props);
  		this.state = {
  			fname: "",
  			lname: "",
  			email: "",
        password: ""

  		}
  }

  // defining a method (arrow notation method)
  // which automatically binds to 'this'
  signUp = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    //let formData = new FormData();
		//formData.append('fname', this.state.fname);
		//formData.append('lname', this.state.lname);
		//formData.append('email', this.state.email);
    //formData.append('password', this.state.password);
    let formData = JSON.stringify(this.state);
    fetch("http://localhost:5000/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: formData,
    })
      .then(this.fetchCheckStatus)
      .then(response => {
          // response is an object which contains status code and other information
          // check if response.status is OK
          if (response.status == 200) {
            // if success, navigate to the sign in page
            // move to sign in page with a parameter to let user know sign up success
            window.location.href = '/user/signin?rx=1';
          } else {
            alert("Sign up failed ... please contact support");
          }

      })
      .catch(error => {
        console.log(error);
        return;
      });
  };
  fetchCheckStatus = (response) => {
    console.log(response.status);
  	if (response.status >= 200 && response.status < 300) {
  		return Promise.resolve(response)
  	} else {
  		response.status = "Transaction rejected ...";
  		return Promise.reject(new Error(response))
  	}
  }
  render() {
    return (
      <>
      <Navbar  page="Signup"/>
      <div className="container">
        <h3>Sign Up</h3>
        <div className="container">
        <div className="row">
        {/* bootstrap responsive design
          width of  columns on a 12 column grid:
          for xs (mobile) sign up takes whole screen (12 cols)
          for med page size, sign up takes 6 columns
          for large page size, sign up takes 5 cols
          */}
        <div className="col-lg-5 col-md-6 col-xs-12">
        <form className="border shadow-sm rounded p-3 mb-3" onSubmit={this.signUp}>
          <div className="form-group">
            <label htmlFor="fname">First Name</label>
            <input
              type="text"
              className="form-control"
              id="fname"
              value={this.state.fname}
              onChange={(e) => this.setState({ fname: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lname">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lname"
              value={this.state.lname}
              onChange={(e) => this.setState({ lname: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              className="form-control"
              id="email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Sign Up"
              className="btn btn-primary"
            />
          </div>
        </form>
        </div>
        </div>
        </div>
      </div>
      </>
    );
  }
}
export default SignUp;
