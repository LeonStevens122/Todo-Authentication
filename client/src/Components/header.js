// import components and dependancies

import React from "react";
import { Component } from "react";
import {
  BrowserRouter as Router,
  Link,
  
} from "react-router-dom";

// JavaScript source code

class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    // show the dynamically rendered Menu and the Header component with the logo
    return (
      <div className="container-fluid">
        <nav className="navbar navbar-expand-sm bg-light navMain">
          <ul className="navbar-nav">
            
            <li className="nav-item">
              <Link className="linkItem" to="/">
                Car List
              </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="linkItem" to="/Search">
                            Search Cars
              </Link>
                    </li>
            <li className="nav-item">
              <Link className="linkItem" to="/AddItem">
                Add Car
              </Link>
            </li>
            <li className="nav-item">
              <Link className="linkItem" to="/Update">
                            Update Single Car Details
              </Link>

                    </li>

                    <li className="nav-item">
                        <Link className="linkItem" to="/UpdateAll">
                            Update Car Details
              </Link>
                    </li>


                    <li className="nav-item">
                        <Link className="linkItem" to="/DeleteOne">
                            Delete one
              </Link>
                    </li>
            <li className="nav-item">
              <Link className="linkItem" to="/DeleteAll">
                Delete All
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Header;
