import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Outlet } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";

const Layout = (props) => {
  let [search, setSearch] = useState("");

  async function searchForUsers() {
    const response = await fetch(
      "http://localhost:8088/user/search/" + search,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const body = await response.json();
      props.handler(body);
    } else {
      props.handler([]);
    }
  }
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Nav className="me-auto left-margin">
          <InputGroup>
            <FormControl
              placeholder="Search for people"
              aria-label="searchbar"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              variant="secondary"
              id="search-btn"
              onClick={searchForUsers}
            >
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
