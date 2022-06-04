import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Outlet } from "react-router-dom";

const Layout = (props) => {
  let navigate = useNavigate();
  return (
    <div>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        className="justify-content-center"
      >
        <Nav>
          <Nav.Link
            onClick={() => {
              navigate("/home", { replace: true });
            }}
          >
            Home
          </Nav.Link>
          <Nav.Link
            onClick={() => {
              navigate("/login", { replace: true });
            }}
          >
            Login
          </Nav.Link>
          <Nav.Link
            onClick={() => {
              navigate("/register", { replace: true });
            }}
          >
            Register
          </Nav.Link>
        </Nav>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default Layout;
