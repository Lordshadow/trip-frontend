import React, { useState, useEffect, useRef } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa"; // Import user icon
import "../styles/styles.css"; // Your custom CSS
import logo from "/assets/logo.jpg";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} alt="Hotel Logo" className="logo" />
          TripTactix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/locations">Locations</Nav.Link>
            <Nav.Link href="/vehicles">Vehicles Catalog</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>

            {/* Avatar Dropdown */}
            <div
              className="profile-dropdown position-relative"
              ref={dropdownRef}
            >
              <FaUserCircle
                size={30}
                color="currentColor"
                onClick={toggleMenu}
                style={{ cursor: "pointer" }}
                aria-expanded={menuOpen}
              />
              {menuOpen && (
                <div className="dropdown-menu-custom">
                  <a href="/signup">Sign Up</a>
                  <a href="/login">Log In</a>
                  <a href="/profilepage">My Profile</a>
                  <a href="/profile/my-orders">My Orders</a>
                </div>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
