import React from 'react';
import './AppDetail.css';
import LandView from '../components/LandView.js';
import Navbar from '../components/Navbar.js'
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
      lands:""
    };
    var href = window.location.href;
    var type = href.substring(href.lastIndexOf("/")+1);
    if(type === '1'){
      this.state = {
        title: "Providence Cialis Island",
        cover:"/1.jpg",
        area:"1278781 sq.m",
        detail:"Famed for its crystal clear waters and white sand beaches, a slice of paradise in the Turks and Caicos has been named the best island in the world.",
        distance:"4.9 km",
        address:"Lake Maracaibo, Venezuela, 14 km southeast of Maracaibo, northwest of Santa Rita",
        lands:"Providence Cialis Island",
        type: type
      };
    }else if(type === '2'){
      this.state = {
        title: "Maui, Hawaii",
        cover:"/2.jpg",
        area:"45780 sq.m",
        detail:"TripAdvisor said the rankings are based on reviews from users around the world, with winners being determined using an algorithm that considers the quantity and quality of reviews and ratings for each island’s hotels, restaurants and attractions",
        distance:"8.9 km",
        address:"Maui is the most famous of the Hawaiian islands, with more than 2.5 million visitors a year, second only to Honolulu and Oahu, home of Pearl Harbor",
        lands:"Maui, Hawaii",
        type: type
      };
    }else if(type === '3'){
      this.state = {
        title: "Santorini",
        cover:"/3.jpg",
        area:"85124545 sq.m",
        detail:"Rounding out the top five were Santorini in Greece, which was named the best island in Europe, and Ko Tao in Thailand",
        distance:"8.9 km",
        address:"Seagulls fly to santorini, China, on the northernmost side of the Shengsi islands in Zhoushan, Zhejiang Province",
        lands:"Santorini",
        type: type
      };
    }else if(type === '4'){
      this.state = {
        title: "Madeira, Portugal",
        cover:"/4.jpg",
        area:"878112 sq.m",
        detail:"In the European top five, Santorini was followed by Madeira, the Greek islands of Crete and Zakynthos, and Fuerteventura in Spain’s Canary Islands",
        distance:"40.9 km",
        address:"Madeira, in the eastern North Atlantic Ocean, is made up of Madeira island, St. Island, and two small, empty islands",
        lands:"Madeira",
        type: type
      };
    }else{
      this.state = {
        title: "",
        cover:"",
        area:"",
        detail:"",
        distance:"",
        address:"",
        lands:"",
      };
    }
  }
  render(){
    return (
      <>
      <Navbar page="Detail" type={this.state.type}/>
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
  </div>
  </>
  );
  }
 }

 export default AppDetail;