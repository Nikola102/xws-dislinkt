import React, { useEffect, useState, useRef } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button";

const Posts = (props) => {
  let [posts, setPosts] = useState([]);
  let [user, setUser] = useState({});
  let refs = useRef([]);
  const getPosts = (username) => {
    fetch("http://localhost:8082/post/" + username, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPosts(data);
      });
  };

  useEffect(() => {
    setUser(props.user);
    getPosts(props.user.username);
    for (let i = 0; i < posts.length; i++) {
      let myRef = React.createRef();
      refs = [...refs, myRef];
    }
  }, [props.user]);
  function ShowComments(index) {
    refs.current[index].style = { display: "none" };
  }
  return (
    <div className={"post-list-profile"}>
      {posts.map((post, index) => (
        <div className={"post-profile"} key={post.id}>
          <p>{user.name + " " + user.surname}</p>
          <p>{post.description}</p>
          <div className={"likes"}>{post.likedUserIds.length} Likes</div>
          <ButtonToolbar aria-label="Toolbar with button groups">
            <ButtonGroup className="mb-2">
              <Button variant="outline-secondary">Like</Button>
            </ButtonGroup>
            <ButtonGroup className="mb-2">
              <Button
                variant="outline-secondary"
                onClick={() => ShowComments(index)}
              >
                Comments
              </Button>
            </ButtonGroup>
            <ButtonGroup className="mb-2">
              <Button variant="outline-secondary">Share</Button>
            </ButtonGroup>
          </ButtonToolbar>
          <div
            className="comment-section"
            ref={(el) => (refs.current[index] = el)}
            style={{ display: "none" }}
          >
            {post.comments.map((comment) => (
              <p className={"comment"} key={comment.userId}>
                {comment.userId + " " + comment.text}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
