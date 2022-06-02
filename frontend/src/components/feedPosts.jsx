import React, { useEffect, useState, useRef } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";

const FeedPosts = (props) => {
  let [posts, setPosts] = useState([]);
  let [user, setUser] = useState({ posts: [] });
  let [comment, setComment] = useState("");
  let refs = useRef([]);

  useEffect(() => {
    setUser(props.user);
    setPosts([]);
    for (let i = 0; i < props.posts.length; i++) {
      if (
        props.posts[i].username !== props.user.username &&
        props.user.following.includes(props.posts[i].username)
      ) {
        setPosts((posts) => [...posts, props.posts[i]]);
      }
    }

    for (let i = 0; i < posts.length; i++) {
      let myRef = React.createRef();
      refs.current = [...refs.current, myRef];
    }
  }, [props.user, props.posts]);
  function ShowComments(index) {
    refs.current[index].style = { display: "none" };
  }
  async function LikePost(postId) {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ userId: user.username, postId: postId }),
    };
    const response = await fetch(
      "http://localhost:8082/post/like",
      requestOptions
    );
    props.refreshPage();
  }
  async function DislikePost(postId) {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ userId: user.username, postId: postId }),
    };
    const response = await fetch(
      "http://localhost:8082/post/dislike",
      requestOptions
    );
    props.refreshPage();
  }
  async function CommentPost(postId) {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ text: comment, userId: user.username }),
    };
    const response = await fetch(
      "http://localhost:8082/post/" + postId + "/comment",
      requestOptions
    );
    props.refreshPage();
  }
  return (
    <div className={"post-list"}>
      {posts.map((post, index) => (
        <div className={"post"} key={post.id}>
          <a href={post.username}>{post.username}</a>
          <p>{post.description}</p>
          <Image width="100%" height="auto" src={post.image} />
          <div className={"likes"}>
            {post.likedUserIds.length} Likes {post.dislikedUserIds.length}{" "}
            Dislikes {post.comments.length} Comments
          </div>
          <ButtonToolbar aria-label="Toolbar with button groups">
            <ButtonGroup className="mb-2">
              <Button
                variant="outline-secondary"
                onClick={() => LikePost(post.id)}
              >
                Like
              </Button>
            </ButtonGroup>
            <ButtonGroup className="mb-2">
              <Button
                variant="outline-secondary"
                onClick={() => DislikePost(post.id)}
              >
                Dislike
              </Button>
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
            className="comment-section"
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
              <Button
                variant="outline-primary"
                onClick={() => CommentPost(post.id)}
              >
                Post Comment
              </Button>
            </Form>
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

export default FeedPosts;
