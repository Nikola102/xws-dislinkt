import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/home" element={<Home y />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
