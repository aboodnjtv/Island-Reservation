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
      list: []
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
      new HttpRequest().get("/islands")
      .then((response) => {
        this.setState({
          list: response.data
        });
      })
    }else if(type === 1){
      new HttpRequest().get("/islands/land_size/asc")
      .then((response) => {
        this.setState({
          list: response.data
        });
      })
    }else if(type == 2){
      new HttpRequest().get("/islands/land_size/desc")
      .then((response) => {
        this.setState({
          list: response.data
        });
      })
    }else if(type == 3){
      new HttpRequest().get("/islands/price/asc")
      .then((response) => {
        this.setState({
          list: response.data
        });
      })
    }else if(type == 4){
      new HttpRequest().get("/islands/price/desc")
      .then((response) => {
        this.setState({
          list: response.data
        });
      })
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
          <button type="button" className="btn btn-secondary" onClick={() => this.handleClick(0)}>Default</button>
          <button type="button" className="btn btn-secondary" onClick={() => this.handleClick(1)}>Size Asc</button>
          <button type="button" className="btn btn-secondary" onClick={() => this.handleClick(2)}>Size Desc</button>
          <button type="button" className="btn btn-secondary" onClick={() => this.handleClick(3)}>Price Asc</button>
          <button type="button" className="btn btn-secondary" onClick={() => this.handleClick(4)}>Price Desc</button>
        </div>
      </div>
      {listItems}
    </div>);
  }
 }

 export default AppIndex;