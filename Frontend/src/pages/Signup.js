import React from 'react';
import './Signup.css'
import Navbar from '../components/Navbar.js'

class SignUp extends React.Component {
  constructor(props) {
  		super(props);
  		this.state = {
  			"fname": "",
  			"lname": "",
  			"email": "",
        "password": ""
  		}
  }

  // defining a method (arrow notation method)
  // which automatically binds to 'this'
  signUp = () => {
    fetch("http://localhost:5000/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
    .then((response) => response.json())
    .then((data) => {
      window.alert(data.id);

      /*
      * possible way to get JSON object using json()
      * return response.json().then(function(json) {
      *   // process your JSON further
      * });
      *
      */
    })
    // .then( async (response) => {
    //    const data = await response.json(); 
    //   //  const conv = await data.toString();
    //    window.alert(data);
    //    console.log('Success:', data);
    //   //  window.alert(data.id);
    // })

    // .then( (data) => {
    //   // console.log(data); 
    //   window.alert(data);
    // })
    .catch((error) => {
      console.error('Error:', error);
    });

    // try
    // {
    // let response = fetch("http://localhost:5000/api/user/signup", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(this.state),
    // });

    // // await window.alert(response.toString());
    // window.alert(response.toString());
    // // await window.alert(data.toString());
    //   // .then(this.fetchCheckStatus)
    //   // .then(async response => await response.json())
    //   // .then(async data => await window.alert(data))
    //   // .then(async response => {
    //   //     // this data can contain a json that says
    //   //     // the user is signed up successfully (email dne already)
    //   //     // all fields must be entered
    //   //     // await window.alert("tried");
    //   //     const data = await response.json();
    //   //     // const response = data.json();
    //   //     // console.log(data);
    //   //     // await window.alert(data);
    //   // })
    //   // .catch(error => {
    //   //   window.alert(error);
    //   //   return;
    //   // });
    // }
    // catch(err)
    // {
    //   window.alert(err.message);
    // }

  };
  fetchCheckStatus = (response) => {
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
            <label htmlFor="email">EMAIL HERE</label>
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
