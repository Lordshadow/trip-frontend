import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "../styles/styles.css"; // Import CSS
import logo from "../assets/logo.jpg"

const NavBar = () => {
  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} alt="Hotel Logo" className="logo" />
          TripTactix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/rooms">Rooms</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
            <Nav.Link href="/activities">Activities</Nav.Link>
            <Nav.Link href="/profilepage">Pofile</Nav.Link>
            <Nav.Link href="/signup" className="btn btn-primary text-white px-3">Sign Up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
