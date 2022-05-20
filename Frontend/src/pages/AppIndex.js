import React from "react";
import "./appIndex.css";
import CardView from "../components/CardView.js";
import HttpRequest from "../components/HttpRequest.js";
import Navbar from "../components/Navbar.js";
/**
 * app home
 */
class AppIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
    //http请求
    new HttpRequest().get("/islands").then((response) => {
      this.setState({
        list: response.data,
      });
    });
  }
  render() {
    const list = this.state.list;
    console.log(list);
    const listItems = list.map((item) => (
      <div key={item._id} className="col-lg-3 col-md-4 col-sm-12">
        <CardView
          title={item.name}
          distance={item.rating}
          area={item.land_size}
          cover={item.islandImg}
          is_available={item.is_available}
        />
      </div>
    ));
    return (
      <>
        <Navbar page="Gallery" />

        <div className="row">{listItems}</div>
      </>
    );
  }
}

export default AppIndex;
