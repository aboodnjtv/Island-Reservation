import React from 'react';
import './appIndex.css';
import CardView from '../components/CardView.js';
import HttpRequest from '../components/HttpRequest.js';

/**
 * app home
 */
 class AppIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      //0 land size desc 1 land size asc
      //2 price desc 3 price asc
      //4 rating desc 5 rating asc
      sortBy:-1
    }
    //http请求
    new HttpRequest().get("/islands")
    .then((response) => {
      this.setState({
        list: response.data
      });
    })
  }
  handleClick(type) {
    this.setState({
      list: []
    });
    if(type === 0){
      if(this.state.sortBy === 0){
        //to up
        this.setState({
          sortBy:1
        });
        new HttpRequest().get("/islands/land_size/desc")
        .then((response) => {
          this.setState({
            list: response.data
          });
        })
      }else{
        this.setState({
          sortBy:0
        });
        new HttpRequest().get("/islands/land_size/asc")
        .then((response) => {
          this.setState({
            list: response.data
          });
        })
      }
    }else if(type === 1){
      if(this.state.sortBy === 2){
        //to up
        this.setState({
          sortBy:3
        });
        new HttpRequest().get("/islands/price/desc")
        .then((response) => {
          this.setState({
            list: response.data
          });
        })
      }else{
        this.setState({
          sortBy:2
        });
        new HttpRequest().get("/islands/price/asc")
        .then((response) => {
          this.setState({
            list: response.data
          });
        })
      }
    }else if(type === 2){
      if(this.state.sortBy === 3){
        //to up
        this.setState({
          sortBy:4
        });
        new HttpRequest().get("/islands/rating/desc")
        .then((response) => {
          this.setState({
            list: response.data
          });
        })
      }else{
        this.setState({
          sortBy:3
        });
        new HttpRequest().get("/islands/rating/asc")
        .then((response) => {
          this.setState({
            list: response.data
          });
        })
      }
    }
  }
  render(){
    const list = this.state.list;
    const listItems = list.map((item) =>
    <div key={item._id} className="col-lg-3 col-md-4 col-sm-12">
      <CardView title={item.name} distance={item.rating} area={item.land_size} cover={item.islandImg} />
    </div>
    );
    console.log(listItems);
    return (
    <div className="row">
      <div className='col-12'>
        <div className="btn-group buttons" role="group" aria-label="Basic example">
          <button type="button" className="btn btn-outline-dark" onClick={() => this.handleClick(0)}>Land Size{this.state.sortBy === 0 ? <i className='triangle-up'></i> : <></>}{this.state.sortBy === 1 ? <i className='triangle-down'></i> : <></>}</button>
          <button type="button" className="btn btn-outline-dark" onClick={() => this.handleClick(1)}>Price{this.state.sortBy === 2 ? <i className='triangle-up'></i> : <></>}{this.state.sortBy === 3 ? <i className='triangle-down'></i> : <></>}</button>
          <button type="button" className="btn btn-outline-dark" onClick={() => this.handleClick(2)}>Rating{this.state.sortBy === 4 ? <i className='triangle-up'></i> : <></>}{this.state.sortBy === 5 ? <i className='triangle-down'></i> : <></>}</button>
        </div>
      </div>
      {listItems}
    </div>);
  }
 }

 export default AppIndex;