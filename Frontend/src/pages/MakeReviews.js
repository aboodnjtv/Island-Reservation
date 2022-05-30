import React from 'react';
import ReviewsDisplay from "../components/ReviewsDisplay";
import Navbar from "../components/Navbar";

class MakeReviews extends React.Component{
  constructor(props) {
    // let userRecordString = sessionStorage.getItem("userRecord");
    // userRecordString = unescape(userRecordString);
    super(props);
    this.state = {
      userRecord: null,
      // reviews: [],
    };
    }

  componentDidMount() {
    // save self as current this state because .then is an event handler
    // the event handler redefines 'this'
    // create a pointer to 'this' so that we can use set state of the component
    let self = this;
    // get user id from the userRecord gathered from sign in
    let userid = sessionStorage.getItem("userRecordID");
    
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

    // fetch()

  }  

  render(){
    // now we have a json record of the user inside 'userRecord'
    let existing_past_reservations = this.state.userRecord &&
      this.state.userRecord.past_reservations &&
      this.state.userRecord.past_reservations.length > 0;

    return(
      <>
      <Navbar page="Review Island" />
      <section className="container">
        <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title" style={{fontSize: '25px', textAlign: 'center'}}>Review Your Reservations</h5>
                    <div className="card-text">
                    {existing_past_reservations ?
                      this.state.userRecord.past_reservations.map(function (entry, i) {
                        return (
                          <ReviewsDisplay key={"past-reservation-" + i} idx={i} entry={entry}/>
                        )
                      }) :
                      <div>No Reservations</div>
                    }
                    </div>
                  </div>
                </div>
              </div>
            </div>
      </section>
      </>
    )
  }
}

export default MakeReviews;