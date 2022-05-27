import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="login">Login</Nav.Link>
          <Nav.Link href="register">Register</Nav.Link>
        </Nav>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default Layout;
