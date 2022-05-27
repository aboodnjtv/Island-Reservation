import React from "react";
import Navbar from "../components/Navbar";
import MyIslandCard from "../components/MyIslandCard";

class ManageIslands extends React.Component {
  constructor(props) {
    // let userRecordString = sessionStorage.getItem("userRecord");
    // userRecordString = unescape(userRecordString);
    super(props);
    this.state = {
      islandRecords: null
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
    fetch("http://localhost:5000/islands", {
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
      self.setState({islandRecords: data});
    })
    .catch(error => {
      window.alert(error);
      return;
    });

  }
  render() {
    return (
      <>
        <Navbar page="My Islands" />
        <div className="container">
          <h3 style={{textAlign: 'center'}}>Manage Your Islands</h3>
          <div className="row">
            {this.state.islandRecords && this.state.islandRecords.length > 0 &&
              this.state.islandRecords.map(function (entry, i) {
                return (
                  <MyIslandCard key={"island-" + i} idx={i} entry={entry}/>
                )
              })
            }


        <div className="col-sm-4 col-12" style={{margin: '15px 0'}}>
        <div className="card" style={{width: '18rem'}}>
          <img className="card-img-top" src="..." alt="Card image cap"/>
          <div className="card-body">
            <h5 className="card-title">Add a new Island</h5>
            <p className="card-text">Add your new island here. Other users may reserve your island.</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Add your price per night.</li>
            <li className="list-group-item">Add your island's location.</li>
            <li className="list-group-item">Add your island's ....</li>
          </ul>
          <div className="card-body">
            <a href="/addisland" className="card-link">Navigate</a>
          </div>
        </div>
        </div>
        </div>
        </div>
      </>
    );
  }
}
export default ManageIslands;
