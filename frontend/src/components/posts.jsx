import React, { useEffect, useState, useRef } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Posts = (props) => {
  let [posts, setPosts] = useState([]);
  let [user, setUser] = useState({ posts: [] });
  let [comment, setComment] = useState("");
  let refs = useRef([]);

  useEffect(() => {
    setUser(props.user);
    for (let i = 0; i < user.posts.length; i++) {
      for (let j = 0; j < props.posts.length; j++) {
        if (user.posts[i] == props.posts[j].id) {
          setPosts((posts) => [...posts, props.posts[j]]);
        }
      }
    }
    for (let i = 0; i < posts.length; i++) {
      let myRef = React.createRef();
      refs = [...refs, myRef];
    }
  }, [props.posts, props.user, user.posts]);
  function ShowComments(index) {
    refs.current[index].style = { display: "none" };
  }
  return (
    <div className={"post-list"}>
      {posts.map((post, index) => (
        <div className={"post"} key={post.id}>
          <p>{user.name + " " + user.lastname}</p>
          <p>{post.content}</p>
          <div>{post.likes} Likes</div>
          <ButtonToolbar aria-label="Toolbar with button groups">
            <ButtonGroup className="mb-2">
              <Button variant="outline-secondary">Like</Button>
            </ButtonGroup>
            <ButtonGroup className="mb-2">
              <Button
                variant="outline-secondary"
                onClick={() => ShowComments(index)}
              >
                Comment
              </Button>
            </ButtonGroup>
            <ButtonGroup className="mb-2">
              <Button variant="outline-secondary">Share</Button>
            </ButtonGroup>
          </ButtonToolbar>
          <div
            ref={(el) => (refs.current[index] = el)}
            style={{ display: "none" }}
          >
            <Form>
              <Form.Group className="mb-3" controlId="formBasicComment">
                <Form.Control
                  type="text"
                  placeholder="Add a comment..."
                  onChange={(e) => setComment(e.target.value)}
                />
              </Form.Group>
              <Button variant="outline-primary" type="submit">
                Post Comment
              </Button>
            </Form>
            {post.comments.map((comment) => (
              <p key={comment.userId}>
                {comment.userId + " " + comment.content}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
