import React from 'react';

class LandView extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      cover:props.cover|| '',
      title:props.title || '',
      size:props.size || '',
      reserve:props.reserve
    };
  }
  render(){
    return (
      <div className='land-item'>
        <div className='land-image'>
          <img src={this.state.cover} alt={this.state.title} />
        </div>
        <div className='land-title'>
        {this.state.title}
        </div>
        <div className='land-size'>
          {this.state.size} sq.m
        </div>
        <div className='land-opts'>
        <button title={this.state.reserve ? 'reserve' : 'can\'t reserve'} className='btn btn-primary' disabled={this.state.reserve ? false : true}>Reserve</button>
        </div>
      </div>
    );
  }
}

export default LandView;