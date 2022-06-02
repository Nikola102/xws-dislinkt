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
import Home from "./components/home";
class App extends Component {
  getUsers = this.getUsers.bind(this);
  getPosts = this.getPosts.bind(this);
  state = {
    profiles: [],
    posts: [],
    user: {},
    searchUsers: [],
  };
  userHandler = (val) => {
    this.setState({
      user: val,
    });
  };
  searchHandler = (val) => {
    this.setState({
      searchUsers: val,
    });
  };
  getUsers() {
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
  }
  getPosts() {
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
  componentDidMount() {
    this.getUsers();
    this.getPosts();
  }
  render() {
    return (
      <div className={"background"}>
        <Router>
          <Routes>
            <Route path="/home" element={<Home handler={this.searchHandler} />}>
              <Route
                index
                element={<PublicProfiles profiles={this.state.searchUsers} />}
              />
            </Route>
            {this.state.profiles.map((profile) => (
              <Route
                key={profile.id}
                path={profile.username}
                element={
                  <UserProfile
                    user={profile}
                    refreshPage={this.getPosts}
                    handler={this.searchHandler}
                  />
                }
              />
            ))}
            <Route
              path="login"
              element={<Login handler={this.userHandler} />}
            />
            <Route
              path="register"
              element={<Register handler={this.userHandler} />}
            />
            <Route
              path="feed"
              element={
                <Feed
                  posts={this.state.posts}
                  user={this.state.user}
                  refreshPage={this.getPosts}
                />
              }
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
