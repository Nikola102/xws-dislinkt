import React, { Component } from "react";
import PublicProfiles from "./components/publicProfiles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import Layout from "./components/layout";
import UserProfile from "./components/userProfile";
import Feed from "./components/feed";
import Search from "./components/search";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: [
        {
          id: 1,
          name: "Marko",
          lastname: "Markovic",
          posts: [1, 2, 3],
          username: "markisa99",
        },
        {
          id: 2,
          name: "Darko",
          lastname: "Darkovic",
          posts: [4, 5, 6],
          username: "markisa98",
        },
        {
          id: 3,
          name: "Zarko",
          lastname: "Zarkovic",
          posts: [7, 8, 9],
          username: "markisa97",
        },
      ],
      posts: [
        {
          id: 1,
          content: "I'm feeling good today!",
          likes: 52,
          comments: [
            { userId: 2, content: "Glad to hear that!" },
            { userId: 3, content: "Me too my g!" },
          ],
        },
        {
          id: 2,
          content: "I'm feeling good today!",
          likes: 50,
          comments: [
            { userId: 2, content: "Glad to hear that!" },
            { userId: 3, content: "Me too my g!" },
          ],
        },
        {
          id: 3,
          content: "I'm feeling good today!",
          likes: 51,
          comments: [
            { userId: 2, content: "Glad to hear that!" },
            { userId: 3, content: "Me too my g!" },
          ],
        },
        {
          id: 4,
          content: "I'm feeling good today!",
          likes: 51,
          comments: [
            { userId: 1, content: "Glad to hear that!" },
            { userId: 3, content: "Me too my g!" },
          ],
        },
        {
          id: 5,
          content: "I'm feeling good today!",
          likes: 51,
          comments: [
            { userId: 1, content: "Glad to hear that!" },
            { userId: 3, content: "Me too my g!" },
          ],
        },
        {
          id: 6,
          content: "I'm feeling good today!",
          likes: 51,
          comments: [
            { userId: 1, content: "Glad to hear that!" },
            { userId: 3, content: "Me too my g!" },
          ],
        },
      ],
    };
  }
  render() {
    return (
      <div className={"background"}>
        <Router>
          <Routes>
            <Route path="/home" element={<Layout />}>
              <Route
                index
                element={<PublicProfiles profiles={this.state.profiles} />}
              />
            </Route>
            {this.state.profiles.map((profile) => (
              <Route
                key={profile.id}
                path={profile.username}
                element={
                  <UserProfile posts={this.state.posts} user={profile} />
                }
              />
            ))}
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route
              path="feed"
              element={
                <Feed user={this.state.profiles[0]} posts={this.state.posts} />
              }
            />
            <Route path="search" element={<Search />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
