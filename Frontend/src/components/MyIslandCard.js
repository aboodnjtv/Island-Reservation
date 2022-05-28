import React from "react";
import moment from 'moment';

class MyIslandCard extends React.Component {

  // to access the entry
  // this.props.entry.attribute

  // {/*}<img src={this.state.cover} className="card-img-top" alt="..." />*/}
  numberWithCommas = (x) => {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

  render() {
    return (
      <div className="col-sm-4 col-12" style={{margin: '15px 0'}}>
        <div className="card" style={{border: '1px solid rgba(0,0,0,.125)', width: '18rem'}}>
          <div style={{textAlign: 'center'}}>
            <img className="card-img-top" style={{ height: '150px', width: '210px'}} src={this.props.entry.islandImg}/>
          </div>
          <div className="card-body">
            <h5 className="card-title" style={{textAlign: 'center'}}>{this.props.entry.name}</h5>
            <div className="card-text" style={{textAlign: 'center'}}>{this.props.entry.details}</div>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item" style={{textAlign: 'center'}}>${this.numberWithCommas(this.props.entry.price.toFixed(2))}/night </li>
            <li className="list-group-item" style={{textAlign: 'center'}}>Location: {this.props.entry.location}</li>
            <li className="list-group-item" style={{textAlign: 'center'}}>Land Size: {this.props.entry.land_size}</li>
            <li className="list-group-item" style={{textAlign: 'center'}}>Lat/Long: {this.props.entry.latitude}, {this.props.entry.longitude}</li>
            <li className="list-group-item" style={{textAlign: 'center'}}>Current Rating: {this.props.entry.rating}</li>
          </ul>
          <div className="card-body">
            <div style={{textAlign: 'center'}}>
              <a href="/editisland" className="card-link">
                Edit Details
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MyIslandCard;
