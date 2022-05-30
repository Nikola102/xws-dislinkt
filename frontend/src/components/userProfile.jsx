import React, { useState, useEffect } from "react";
import Posts from "./posts";
import Image from "react-bootstrap/Image";

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
      </div>
      <div className={"profile-page-body"}>
        <h3 className={"profile-h3"}>Posts</h3>
        <Posts posts={posts} user={user} />
      </div>
    </div>
  );
};

export default UserProfile;
