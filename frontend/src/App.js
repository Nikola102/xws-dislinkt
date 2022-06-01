import React, { Component } from "react";
import PublicProfiles from "./components/publicProfiles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import Layout from "./components/layout";
import UserProfile from "./components/userProfile";
import Feed from "./components/feed";
import Search from "./components/search";
import EditProfile from "./components/editProfile";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: [],
      posts: [],
      user: {},
      searchUsers: [],
    };
    this.userHandler = (val) => {
      console.log(this.state.user);
      this.setState({
        user: val,
      });
      console.log(this.state.user);
    };
    this.searchHandler = (val) => {
      console.log(val);
      this.setState({
        searchUsers: val,
      });
    };
  }
  componentDidMount() {
    fetch("http://localhost:8088/user/", {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          profiles: data,
        });
      });
    fetch("http://localhost:8082/post/", {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          posts: data,
        });
      });
  }
  render() {
    return (
      <div className={"background"}>
        <Router>
          <Routes>
            <Route
              path="/home"
              element={<Layout handler={this.searchHandler} />}
            >
              <Route
                index
                element={<PublicProfiles profiles={this.state.searchUsers} />}
              />
            </Route>
            {this.state.profiles.map((profile) => (
              <Route
                key={profile.id}
                path={profile.username}
                element={<UserProfile user={profile} />}
              />
            ))}
            <Route
              path="login"
              element={<Login handler={this.userHandler} />}
            />
            <Route path="register" element={<Register />} />
            <Route
              path="feed"
              element={<Feed posts={this.state.posts} user={this.state.user} />}
            />
            <Route path="search" element={<Search />} />
            <Route
              path=":username/edit"
              element={<EditProfile user={this.state.user} />}
            />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
