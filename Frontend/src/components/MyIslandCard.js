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
          <img className="card-img-top" src="..." alt="Card image cap"/>
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">Some quick example text to build on the card
              title and make up the bulk of the card's content.</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Cras justo odio</li>
            <li className="list-group-item">Dapibus ac facilisis in</li>
            <li className="list-group-item">Vestibulum at eros</li>
          </ul>
          <div className="card-body">
            <a href="#" className="card-link">Card link</a>
          </div>
        </div>
      </div>
    );
  }
}

export default MyIslandCard;
