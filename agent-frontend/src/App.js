import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Register from "./components/register";
import Company from "./components/company";
class App extends Component {
  state = {
    user: {},
  };
  userHandler = (val) => {
    this.setState({
      user: val,
    });
  };
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route
            path="/register"
            element={<Register handler={this.userHandler} />}
          />
          <Route path="/company" element={<Company user={this.state.user} />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
