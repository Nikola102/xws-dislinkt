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
    <div>
      <Image rounded src="user.png" width="300" height="300" />
      <Posts posts={posts} user={user} />
    </div>
  );
};

export default UserProfile;
