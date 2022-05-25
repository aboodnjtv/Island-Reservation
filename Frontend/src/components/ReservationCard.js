import React from "react";
import moment from 'moment';

class ReservationCard extends React.Component {

  //             {/*}<img src={this.state.cover} className="card-img-top" alt="..." />*/}
  numberWithCommas = (x) => {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

  render() {
    return (
      <div className="card" style={{border: '1px solid rgba(0,0,0,.125)', padding: '6px', margin: '6px', backgroundColor: '#eee'}}>
        <div className="card-body">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{(this.props.idx + 1).toString() + ": " + this.props.entry.island_id}</h5>
              <div className="card-info-dot">Start Date: {moment(this.props.entry.startDate).format('MM/DD/YYYY')}</div>
              <div className="card-info-dot">End Date: {moment(this.props.entry.endDate).format('MM/DD/YYYY')}</div>
              <div className="card-info-dot">Date Reserved: {moment(this.props.entry.reservationDate).format('MM/DD/YYYY')}</div>
              <div className="card-info-dot">
                Amount Paid: ${this.numberWithCommas(this.props.entry.amountPaid.toFixed(2))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReservationCard;
