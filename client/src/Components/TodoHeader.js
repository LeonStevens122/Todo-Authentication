import React, { Component } from "react";
//import {
//  BrowserRouter as Router,
//  Switch,
//  Route,
//  Link,
//  useParams
//} from "react-router-dom";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

// create a header component to be displayed
class TodoHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: this.props.loggedIn,
      loggedUser: this.props.User
    };
  }

  // set user state based in user Logged In state
  componentDidMount() {
    console.log("Props : ", this.props);
    if (!this.state.loggedIn) {
      this.setState({
        loggedUser: "Not Logged In"
      });
    }
  }

  render() {
    return (
      <div className="Header">
        <Navbar className="NavBar" bg="light" expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/Login">Login</Nav.Link>
                    <Nav.Link href="http://localhost:3001/auth/logout">Log Out</Nav.Link>
                    <Nav.Link href="/Todo">Todo</Nav.Link>

          </Nav>
          <div> User : {this.state.loggedUser} </div>
        </Navbar>
        <h1> To Do List with React & MongoDB</h1>
      </div>
    );
  }
}

export default TodoHeader;
