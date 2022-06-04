import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Outlet } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { FormControl } from "react-bootstrap";

const RegisteredLayout = (props) => {
  const username = sessionStorage.getItem("username");
  let [user, setUser] = useState({});
  let [queryString, setQueryString] = useState("");
  let navigate = useNavigate();
  useEffect(() => {
    setUser(props.profile);
  }, [props.profile]);
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Nav className="me-auto left-margin">
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search for people"
              aria-label="searchbar"
              onChange={(e) => setQueryString(e.target.value)}
            />

            <Button
              variant="secondary"
              id="search-btn"
              onClick={() => {
                navigate("/search?username=" + queryString);
              }}
            >
              Search
            </Button>
          </InputGroup>
        </Nav>
        <Nav className="justify-content right-margin">
          <Nav.Link
            onClick={() => {
              navigate("/feed", { replace: true });
            }}
          >
            Home
          </Nav.Link>
          <Nav.Link
            onClick={() => {
              navigate("/" + username, { replace: true });
            }}
          >
            Profile
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