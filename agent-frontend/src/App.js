import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Register from "./components/register";
class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
