import React from "react";
import Navbar from "../components/Navbar.js";

class ManageIslands extends React.Component {
  constructor(props) {
    // let userRecordString = sessionStorage.getItem("userRecord");
    // userRecordString = unescape(userRecordString);
    super(props);
    this.state = {
      islandRecords: []
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
    fetch("http://localhost:5000/islands?id=" + userid, {
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
      // self.setState({islandRecords: data});
      self.state.islandRecords.push(data);
    })
    .catch(error => {
      window.alert(error);
      return;
    });

  }
  render() {
    // now we have a json record of the user inside 'userRecord'
    return (
      <>
        <Navbar page="Account" />
        <div className="container">
          <h3>Manage Your Islands</h3>
          <div className="container">
          {this.state.islandRecords.length > 0 &&
            this.state.islandRecords.map(function (entry, i) {
              return <div key={"island-" + i}>{JSON.stringify(entry)}</div>;
            })}
          </div>
        </div>
      </>
    );
  }
}
export default ManageIslands;
