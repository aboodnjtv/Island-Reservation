import React from "react";
import "./UserHome.css";
import Navbar from "../components/Navbar.js";

class UserHome extends React.Component {
  constructor(props) {
    let userRecordString = sessionStorage.getItem("userRecord");
    userRecordString = unescape(userRecordString);
    super(props);
    this.state = {
      userRecordString: userRecordString,
    };
  }

  render() {
    let userRecord = JSON.parse(this.state.userRecordString);
    let emptyUserRecord = true;
    if (userRecord) {
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
              Welcome, <span>{userRecord.firstname}</span>&nbsp;
              <span>{userRecord.lastname}</span>!
            </h1>
            <div className="row">
              <div className="col-sm-6 col-12">
                <div className="card mb-3" style={{ maxWidth: "540px" }}>
                  <div className="row no-gutters">
                    <div className="col-md-4">
                      <img
                        src="./userHomePageImages/suitcase.jpg"
                        alt="..."
                        class="img-thumbnail"
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
                        class="img-thumbnail"
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">Your Balance</h5>
                        <p className="card-text">
                          Your account currently has a balance of $
                          <span>{userRecord.balance}</span>.
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
                        class="img-thumbnail"
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">Manage Your Islands</h5>
                        <p className="card-text">
                          Add an island and allow users to place bookings, or
                          remove your island here.
                        </p>
                        <a href="/" className="btn btn-primary">
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
                        class="img-thumbnail"
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
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Active Reservations</h5>
                    <p className="card-text">
                      {userRecord.bookingArray &&
                        userRecord.bookingArray.map(function (entry, i) {
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
                      {userRecord.pastBookingArray &&
                        userRecord.pastBookingArray.map(function (entry, i) {
                          return <div key={"past-booking-" + i}>{entry}</div>;
                        })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="container">No User Record in session!</section>
        )}
      </>
    );
  }
}
export default UserHome;
