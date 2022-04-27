import React from 'react';
import './appIndex.css';
import CardView from '../components/CardView.js';
import Navbar from '../components/Navbar.js'
/**
 * app home
 */
 class AppIndex extends React.Component {
  render(){
    return (
    <>
    <Navbar page="Gallery"/>
    <div className="row">
      <div className="col-lg-3 col-md-4 col-sm-12">
        <CardView title='Providence Cialis Island' distance='4.9' area='1278781' cover='1.jpg' />
      </div>
      <div className="col-lg-3 col-md-4 col-sm-12">
        <CardView title='Maui, Hawaii' distance='8.9' area='45780' cover='2.jpg' />
      </div>
      <div className="col-lg-3 col-md-4 col-sm-12">
        <CardView title='Santorini' distance='8.9' area='85124545' cover='3.jpg' />
      </div>
      <div className="col-lg-3 col-md-4 col-sm-12">
        <CardView title='Madeira, Portugal' distance='40.9' area='878112' cover='4.jpg' />
      </div>
    </div>
    </>
  );
  }
 }

 export default AppIndex;