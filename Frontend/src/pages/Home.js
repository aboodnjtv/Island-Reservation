import React from 'react';
import './Home.css';
import Navbar from '../components/Navbar.js'
/**
 * app home
 */
class Home extends React.Component {
  render(){
    return (
      <>
        <Navbar  page="Home"/>

        <div id="carouselExampleIndicators"
          className="carousel slide"
          data-ride="carousel"
          style={{height: '100%'}}
        >
          <ol className="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="5"></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="d-block w-100 justify-content-center min-vh-100" src="HomePageImages/homepage1.jpg" alt="First slide" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100 justify-content-center min-vh-100" src="HomePageImages/homepage2.jpg" alt="Second slide" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100 justify-content-center min-vh-100" src="HomePageImages/homepage3.jpg" alt="Third slide" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100 justify-content-center min-vh-100" src="HomePageImages/homepage4.jpg" alt="Fourth slide" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100 justify-content-center min-vh-100" src="HomePageImages/homepage5.jpg" alt="Fifth slide" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100 justify-content-center min-vh-100" src="HomePageImages/homepage6.jpg" alt="Sixth slide" />
            </div>
          </div>
          <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>

      </>
    )
  }
}
export default Home;
