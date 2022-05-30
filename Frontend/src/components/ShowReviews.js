import React from "react";
import moment from 'moment';

class ShowReviews extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      userRating: props.item.userReview || "",
      rating: props.item.rating || "",
    };
  }
  
  render() {
    
    return (
      <div className="card" style={{border: '1px solid rgba(0,0,0,.125)', padding: '6px', margin: '6px'}}>
        <div className="card-body">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-4 col-12">
                <div className="card-info-dot">{this.state.userRating}</div>
                <div className="card-info-dot"> {this.state.rating} / 5</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShowReviews;