import React from 'react';

class Navbar extends React.Component {
  constructor(props) {
      super(props);
  }

  render(){
    return (
      <nav className="navbar navbar-expand-lg navbar-light" style={{zIndex: '100'}}>
        <a className="navbar-brand" href="#">
          {/* set logo with Is. Res. text, &nbsp; adds a non-breakable space before word */}
          <img src="logo192.png" style={{height: '30px', width: '30px'}}/>
          &nbsp;Island Reservation
        </a>
        <button
          className="navbar-toggler" type="button" data-toggle="collapse"
          data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="container" id="navbarNav">
          <ul class="nav navbar-nav pull-left">
          </ul>
          <ul className="nav navbar-nav text-center btn-space">
            <li className={"nav-item" + (this.props.page == 'Home' ? " active" : "")}>
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            <li className={"nav-item" + (this.props.page == 'Gallery' ? " active" : "")}>
              <a className="nav-link" href="/list">
                Gallery
              </a>
            </li>
            {/* This li component will show on condition that page == 'Detail' */}
            {this.props.page == "Detail" &&
              <li className={"nav-item" + (this.props.page == 'Detail' ? " active" : "")}>
                <a className="nav-link" href={"/detail/" + (this.props.type && this.props.type : "")}>
                  Detail
                </a>
              </li>
            }
          </ul>
          <ul class="nav navbar-nav pull-right">

          <li className={"nav-item" + (this.props.page == 'Login' ? " active" : "")}>
            <a className="nav-link" href="/user/signin">
              Account
            </a>
          </li>

          <li className={"nav-item" + (this.props.page == 'Signup' ? " active" : "")}>
            <a className="nav-link" href="/user/signup">
              Join
            </a>
          </li>


          </ul>
        </div>
      </nav>

    )
  }
}
export default Navbar;
