import React from "react";
import "./UserHome.css";
import Navbar from "../components/Navbar.js";

class UserHome extends React.Component {
  constructor(props) {
    // let userRecordString = sessionStorage.getItem("userRecord");
    // userRecordString = unescape(userRecordString);
    super(props);
    this.state = {
      userRecord: null
    };
  }

  componentDidMount() {
    // save self as current this state because .then is an event handler
    // the event handler redefines 'this'
    // create a pointer to 'this' so that we can use set state of the component
    let self = this;
    // get user id from the userRecord gathered from sign in
    let userRecordString = sessionStorage.getItem("userRecord");
    // get rid of escape characters in user record string
    userRecordString = unescape(userRecordString);
    // make string into json
    let userRecord = JSON.parse(userRecordString);

    let userid = userRecord.user_info._id;
    if (!userid) {
      userid = userRecord._id;
    }

    // fetch latest version of user data from backend
    fetch("http://localhost:5000/user?id=" + userid, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(response => {
      // If the HTTP response is 2xx then response.ok will have a value of true
      if (!response.ok) {
        const data = response.json();
        throw new Error(data.message);
      }
      // return the promise(response.json) so that the next .then can resolve the promise
      return response.json();
    })
    .then(data => {
      // resolve the promise: response.json(), into data as a user record
      self.setState({userRecord: data});
    })
    .catch(error => {
      window.alert(error);
      return;
    });

  }
  render() {
    // let userRecord = JSON.parse(this.state.userRecordString);
    // check if no user record
    let emptyUserRecord = true;
    if (this.state.userRecord) {
      emptyUserRecord = false;
    }

    // now we have a json record of the user inside 'userRecord'

    return (
      <>
        <Navbar page="Account" />
        {!emptyUserRecord ? (
          <section className="container">
            <h1>
              {" "}
              Welcome, <span>{this.state.userRecord.user_info.firstname}</span>&nbsp;
              <span>{this.state.userRecord.user_info.lastname}</span>!
            </h1>
            <div className="row">
              <div className="col-sm-6 col-12">
                <div className="card mb-3" style={{ maxWidth: "540px" }}>
                  <div className="row no-gutters">
                    <div className="col-md-4">
                      <img
                        src="./userHomePageImages/suitcase.jpg"
                        alt="..."
                        className="img-thumbnail"
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">Book an Island</h5>
                        <p className="card-text">
                          Your dream vacation is now a reality, book with us
                          here.
                        </p>
                        <a href="/list" className="btn btn-primary">
                          Reserve
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-12">
                <div className="card mb-3" style={{ maxWidth: "540px" }}>
                  <div className="row no-gutters">
                    <div className="col-md-4">
                      <img
                        src="./userHomePageImages/money1.jpg"
                        alt="..."
                        className="img-thumbnail"
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">Your Balance</h5>
                        <p className="card-text">
                          Your account currently has a balance of $
                          <span>{this.state.userRecord.user_info.balance}</span>.
                        </p>
                        <a href="/addcredit" className="btn btn-primary">
                          Add credit
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6 col-12">
                <div className="card mb-3" style={{ maxWidth: "540px" }}>
                  <div className="row no-gutters">
                    <div className="col-md-4">
                      <img
                        src="./userHomePageImages/island1.jpg"
                        alt="..."
                        className="img-thumbnail"
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">Manage Your Islands</h5>
                        <p className="card-text">
                          Add an island and allow users to place bookings, or
                          update your existing island here.
                        </p>
                        <a href="/addisland" className="btn btn-primary">
                          Manage
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-12">
                <div className="card mb-3" style={{ maxWidth: "540px" }}>
                  <div className="row no-gutters">
                    <div className="col-md-4">
                      <img
                        src="./userHomePageImages/rating.jpg"
                        alt="..."
                        className="img-thumbnail"
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">Review Your Trip</h5>
                        <p className="card-text">
                          Add a review of your vacation here.
                        </p>
                        <a href="/addcredit" className="btn btn-primary">
                          Review
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-12">
              <div className="card mb-3" style={{ maxWidth: "540px" }}>
                <div className="row no-gutters">
                  <div className="col-md-4">
                    <img
                      src="./userHomePageImages/settings.jpg"
                      alt="..."
                      className="img-thumbnail"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">Account Settings</h5>
                      <p className="card-text">
                        Manage your account information.
                      </p>
                      <a href="/settings" className="btn btn-primary">
                        Settings
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Active Reservations</h5>
                    <p className="card-text">
                      {this.state.userRecord.bookingArray &&
                        this.state.userRecord.bookingArray.map(function (entry, i) {
                          return <div key={"booking-" + i}>{entry}</div>;
                        })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Past Reservations</h5>
                    <p className="card-text">
                      {this.state.userRecord.pastBookingArray &&
                        this.state.userRecord.pastBookingArray.map(function (entry, i) {
                          return <div key={"past-booking-" + i}>{entry}</div>;
                        })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="container">Loading User Record ...</section>
        )}
      </>
    );
  }
}
export default UserHome;
