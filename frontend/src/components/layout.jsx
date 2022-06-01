import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Outlet } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";

const Layout = (props) => {
  let [search, setSearch] = useState("");
  let [searchedUsers, setSearchedUsers] = useState([]);

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
    const body = await response.json();
    setSearchedUsers(await body);
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
              onClick={async () => {
                await searchForUsers();
                props.handler(searchedUsers);
              }}
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
