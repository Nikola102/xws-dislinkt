import React, { Component } from "react";
import PublicProfiles from "./components/publicProfiles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import Layout from "./components/layout";
import Posts from "./components/posts";
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
          name: "Marko",
          lastname: "Markovic",
          posts: [4, 5, 6],
          username: "markisa98",
        },
        {
          id: 3,
          name: "Marko",
          lastname: "Markovic",
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
      ],
    };
  }
  render() {
    return (
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route
                index
                element={<PublicProfiles profiles={this.state.profiles} />}
              />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              {this.state.profiles.map((profile) => (
                <Route
                  path={profile.username}
                  element={<Posts posts={this.state.posts} user={profile} />}
                />
              ))}
            </Route>
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
