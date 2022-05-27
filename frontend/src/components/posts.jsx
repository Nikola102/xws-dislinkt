import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";

const Posts = (props) => {
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
      {posts.map((post) => (
        <div>
          <Container>
            <h1>{user.name + " " + user.lastname}</h1>
            <p>{post.content}</p>
            <div>{post.likes} Likes</div>
            {post.comments.map((comment) => (
              <p>{comment.userId + " " + comment.content}</p>
            ))}
          </Container>
        </div>
      ))}
    </div>
  );
};

export default Posts;
