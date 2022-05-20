import React from "react";

class CardView extends React.Component {
  constructor(props) {
    const is_available_ = "Not Available";

    super(props);
    console.log(props);
    this.state = {
      cover: props.cover || "",
      title: props.title || "",
      distance: props.distance || "",
      area: props.area || "",
      is_available: props.is_available_ || "",
      availability: is_available_,
    };
    if (this.props.is_available) {
      this.state.availability = "Available";
    }
  }
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <div className="card">
            <img src={this.state.cover} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{this.state.title}</h5>
              <div className="card-info">
                <div className="card-info-number">{this.state.distance} km</div>
              </div>
              <div className="card-info-dot">Area {this.state.area} sq.m</div>
              <div className="card-info-dot">
                is_available: {this.state.availability}
              </div>
              <a href="/detail/1" className="btn btn-link">
                Detail
              </a>
              <a href="/reserve" className="btn btn-primary btn-lg active -sm">
                RESERVE NOW
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CardView;
