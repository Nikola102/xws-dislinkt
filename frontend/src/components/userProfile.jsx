import React, { useState, useEffect } from "react";
import Posts from "./posts";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";
const UserProfile = (props) => {
  let [posts, setPosts] = useState([]);
  let [user, setUser] = useState({ posts: [] });
  useEffect(() => {
    setUser(props.user);
    for (let i = 0; i < user.posts.length; i++) {
      for (let j = 0; j < props.posts.length; j++) {
        if (user.posts[i] == props.posts[j].id) {
          setPosts((posts) => [...posts, props.posts[j]]);
        }
      }
    }
  }, [props.posts, props.user, user.posts]);
  return (
    <div className={"profile-page"}>
      <div className={"profile-page-image"}>
        <Image rounded src="user.png" width="200" height="200" align="left" />
        <h1>{user.name + " " + user.lastname}</h1>
        <Row className={"profile-view-row"}>
          <Col>
            <Button className="profile-btn">Follow</Button>
          </Col>
          <Col>
            <Button variant="outline-primary" className="profile-btn">
              Message
            </Button>
          </Col>
          <Col>
            <Button variant="outline-danger" className="profile-btn">
              Block
            </Button>
          </Col>
        </Row>
      </div>
      <div className={"profile-page-body"}>
        <h3 className={"profile-h3"}>{user.name}'s activity</h3>
      </div>
      <Posts posts={posts} user={user} />
    </div>
  );
};

export default UserProfile;
