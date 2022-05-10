import React from 'react';
import './Signin.css'
import Navbar from '../components/Navbar.js'

class Signin extends React.Component {
  constructor(props) {
  		super(props);
  		this.state = {
  			email: "",
        password: ""
  		}
  }

  // defining a method (arrow notation method)
  // which automatically binds to 'this'
  signIn = () => {
    fetch("http://localhost:5000/user/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then(this.fetchCheckStatus)
      .then(response => response.json())
      .then(data => {
          // this data can contain a json that says
          // the user is signed up successfully (email dne already)
          // all fields must be entered

          console.log(data);
      })
      .catch(error => {
        window.alert(error);
        return;
      });
  };
  fetchCheckStatus = (response) => {
  	if (response.status >= 200 && response.status < 300) {
  		return Promise.resolve(response)
  	} else {
  		response.status = "Transaction rejected ...";
  		return Promise.reject(new Error(response))
  	}
  }
  getUrlParam = (key) => {
    var params = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&#]*)/gi, function(m, key, value) {
        params[key] = value;
    });
    return params[key] ? params[key] : null;
  }
  render() {
    let addSignUpSuccess = (this.getUrlParam('rx') && this.getUrlParam('rx') == "1");
    return (
      <>
      <Navbar  page="Signin"/>
      <div className="container">
        {addSignUpSuccess &&
          <div style={{color: 'red'}}>Sign up was successful!</div>
        }
        <h3>Sign in</h3>
        <div className="container">
        <div className="row">
        {/* bootstrap responsive design
          width of  columns on a 12 column grid:
          for xs (mobile) sign up takes whole screen (12 cols)
          for med page size, sign up takes 6 columns
          for large page size, sign up takes 5 cols
          */}
        <div className="col-lg-5 col-md-6 col-xs-12">
        <form className="border shadow-sm rounded p-3 mb-3" onSubmit={this.signIn}>
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
              value="Sign In"
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
export default Signin;
