import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Register from "./components/register";
import Company from "./components/company";
import Login from "./components/login";
import CompanyView from "./components/companyView";
import JobOffers from "./components/jobOffers";
class App extends Component {
  constructor(props) {
    super(props);
    this.getUser = this.getUser.bind(this);
  }
  state = {
    user: {},
    company: {},
  };
  userHandler = (val) => {
    this.setState({
      user: val,
    });
  };
  companyHandler = (val) => {
    this.setState({
      company: val,
    });
  };
  getUser(username) {
    fetch("http://localhost:8089/agent/username/" + username, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ user: data });
      });
  }
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route
            path="/register"
            element={<Register handler={this.userHandler} />}
          />
          <Route
            path="/company"
            element={
              <Company user={this.state.user} handler={this.companyHandler} />
            }
          />
          <Route path="/login" element={<Login handler={this.userHandler} />} />
          <Route
            path="/company/view"
            element={
              <CompanyView
                company={this.state.company}
                user={this.state.user}
              />
            }
          />
          <Route
            path="/jobs"
            element={
              <JobOffers
                company={this.state.company}
                user={this.state.user}
                refreshPage={this.getUser}
              />
            }
          />
        </Routes>
      </Router>
    );
  }
}

export default App;
