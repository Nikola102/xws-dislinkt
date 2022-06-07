import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Outlet } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { FormControl } from "react-bootstrap";
import { FiLogOut } from "react-icons/fi";
import { IoMdSearch } from "react-icons/io";
import { BsBriefcase } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { AiFillHome } from "react-icons/ai";

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
              style={{ textAlign: "center" }}
              variant="secondary"
              id="search-btn"
              onClick={() => {
                navigate("/search?username=" + queryString);
              }}
            >
              Search{" "}
              <IoMdSearch style={{ height: 20, width: 20, marginBottom: 2 }} />
            </Button>
          </InputGroup>
        </Nav>
        <Nav className="justify-content right-margin">
          <Nav.Link
            style={{ textAlign: "center" }}
            onClick={() => {
              navigate("/feed", { replace: true });
            }}
          >
            <AiFillHome style={{ height: 20, width: 20 }} />
            <br />
            Home
          </Nav.Link>
          <Nav.Link
            style={{ textAlign: "center" }}
            onClick={() => {
              navigate("/" + username, { replace: true });
            }}
          >
            <CgProfile style={{ height: 20, width: 20 }} />
            <br />
            Profile
          </Nav.Link>
          <Nav.Link
            style={{ textAlign: "center" }}
            onClick={() => {
              navigate("/jobs", { replace: true });
            }}
          >
            <BsBriefcase style={{ height: 20, width: 20 }} />
            <br />
            Jobs
          </Nav.Link>
          <Nav.Link
            style={{ textAlign: "center" }}
            onClick={() => {
              sessionStorage.clear();
              navigate("/home", { replace: true });
            }}
          >
            <FiLogOut style={{ height: 20, width: 20 }} />
            <br />
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
