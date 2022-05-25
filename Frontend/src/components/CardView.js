import React from "react";

class CardView extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      cover: props.item.islandImg || "",
      title: props.item.title || "",
      rating: props.item.rating || "",
      area: props.item.land_size || "",
      price: props.item.price || "",
      id: props.item._id,
    };
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
                <div className="card-info-number">{this.state.rating}</div>
              </div>
              <div className="card-info-dot">Area {this.state.area} sq.m</div>
              <div className="card-info-dot">
                Price: ${this.state.price}/night
              </div>
              <a href={`/reserve?island=${this.state.id}`} className="btn btn-primary btn-lg active -sm">
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
