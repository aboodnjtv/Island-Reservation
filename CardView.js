import React from 'react';

class CardView extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      cover:props.cover|| '',
      title:props.title || '',
      distance:props.distance || '',
      area:props.area || '',
      id:props.id || ''
    };
  }
  render(){
    return (
      <div className="card">
          <div className="card-body">
            <div className="card">
              <img src={this.state.cover} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{this.state.title}</h5>
                <div className='card-info'>
                  <div className='card-info-number'>{this.state.distance} km</div>
                </div>
                <div className='card-info-dot'>Area {this.state.area} sq.m</div>
                <a href={'/detail/'+this.state.id} className='btn btn-link'>Detail</a>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default CardView;