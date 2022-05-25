import React from 'react';
import './AppDetail.css';
import LandView from '../components/LandView.js';
import HttpRequest from '../components/HttpRequest.js';
/**
 * app home
 */
 class AppDetail extends React.Component {
  //
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      cover:"",
      area:"",
      detail:"",
      distance:"",
      address:"",
      lands:"",
      id: ""
    };
    var href = window.location.href;
    var id = href.substring(href.lastIndexOf("/")+1);
    new HttpRequest().get("/island?id="+id)
    .then((response) => {
      this.setState({
        title: response.data.name,
        cover:response.data.islandImg,
        area:response.data.land_size,
        detail:response.data.details,
        distance:response.data.longitude + ","+response.data.latitude,
        address:response.data.location,
        lands:"",
        id:response.data._id
      });
    })
  }
  render(){
    return (
      <div className="divContent container">
      <div className="row">
          <div className='col-12'>
            <h1 className="lead">Island Name</h1>
          </div>
          <div className="col-12">
              <blockquote className='person-info'>
                  <h2>{this.state.title}</h2>
              </blockquote>
              <div className="row text-center">
                  <img src={this.state.cover} alt="boy" width="500px" className="img-responsive img-circle img-thumbnail" />
              </div>
              <div className="row text-center card-info">
                  <h3>Detail</h3>
              </div>
              <div className="row card-info">
                  <span>{this.state.detail}</span>
              </div>
          </div>
          <div className="col-sm-12">
              <div className="jumbotron">
                  <h2>Island Info</h2>
                  <p>Area:{this.state.area}</p>
                  <p>Distance:{this.state.distance}</p>
                  <p>Address:{this.state.address}</p>
                  <p>Lands:{this.state.lands}</p>
              </div>
          </div>
          <div className='col-sm-12'>
            <div className='land-list'>
              <LandView cover='/5.png' title='Land1' size='5557.0' reserve={true} />
              <LandView cover='/5.png' title='Land2' size='5148.0' reserve={true} />
              <LandView cover='/5.png' title='Land3' size='4759.0' reserve={false} />
              <LandView cover='/5.png' title='Land4' size='680.0' reserve={true} />
            </div>
          </div>
      </div>
  </div>);
  }
 }

 export default AppDetail;