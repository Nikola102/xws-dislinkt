import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Outlet } from "react-router-dom";

const RegisteredLayout = (props) => {
  const username = sessionStorage.getItem("username");
  let [user, setUser] = useState({});
  let navigate = useNavigate();
  useEffect(() => {
    setUser(props.profile);
  }, [props.profile]);
  return (
    <div>
      <Navbar bg="dark" variant="dark" className="justify-content-center">
        <Nav>
          <Nav.Link
            onClick={() => {
              navigate("/company", { replace: true });
            }}
          >
            Companies
          </Nav.Link>
          <Nav.Link
            onClick={() => {
              navigate("/jobs", { replace: true });
            }}
          >
            Jobs
          </Nav.Link>
          <Nav.Link
            onClick={() => {
              sessionStorage.clear();
              navigate("/home", { replace: true });
            }}
          >
            Logout
          </Nav.Link>
        </Nav>
        <Navbar.Text>Signed in as: {username}</Navbar.Text>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default RegisteredLayout;
