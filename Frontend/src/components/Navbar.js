import React from 'react';

class Navbar extends React.Component {
  constructor(props) {
      super(props);
  }

  render(){
    return (
      <nav className="navbar navbar-expand-sm bg-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className={"nav-link" + (this.props.page == 'Home' ? " disabled-link" : "")}
              style={(this.props.page == 'Home' ? {color: 'gray'} : null)}
              href="/"
            >
              Home
          </a>
          </li>
          <li className="nav-item">
            <a
              className={"nav-link" + (this.props.page == 'Gallery' ? " disabled-link" : "")}
              style={(this.props.page == 'Gallery' ? {color: 'gray'} : null)}
              href="/list"
            >
              Gallery
            </a>
          </li>
          {this.props.page == "Detail" &&
            <li className="nav-item">
              <a
                className={"nav-link" + (this.props.page == 'Detail' ? " disabled-link" : "")}
                style={(this.props.page == 'Detail' ? {color: 'gray'} : null)}
                href={"/detail/" + (this.props.type && this.props.type : "")}
              >
                Detail
              </a>
            </li>
          }
        </ul>
      </nav>
    )
  }
}
export default Navbar;
