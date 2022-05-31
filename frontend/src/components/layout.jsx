import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Outlet } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";

const Layout = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Nav className="me-auto left-margin">
          <InputGroup>
            <FormControl
              placeholder="Search for people"
              aria-label="searchbar"
            />
            <Button variant="secondary" id="search-btn">
              Search
            </Button>
          </InputGroup>
        </Nav>
        <Nav className="justify-content-end right-margin">
          <Nav.Link href="home">Home</Nav.Link>
          <Nav.Link href="login">Login</Nav.Link>
          <Nav.Link href="register">Register</Nav.Link>
        </Nav>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default Layout;
