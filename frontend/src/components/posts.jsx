import React, { useEffect, useState, useRef } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button";
import { Image } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { IoIosShareAlt } from "react-icons/io";
import { BiCommentDetail } from "react-icons/bi";

const Posts = (props) => {
  let [posts, setPosts] = useState([]);
  let [user, setUser] = useState({});
  let [comment, setComment] = useState("");
  let username = sessionStorage.getItem("username");
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
  async function LikePost(postId) {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ userId: username, postId: postId }),
    };
    const response = await fetch(
      "http://localhost:8082/post/like",
      requestOptions
    );
    props.refreshPage();
    getPosts(props.user.username);
  }
  async function DislikePost(postId) {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ userId: username, postId: postId }),
    };
    const response = await fetch(
      "http://localhost:8082/post/dislike",
      requestOptions
    );
    props.refreshPage();
    getPosts(props.user.username);
  }
  async function CommentPost(postId) {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ text: comment, userId: username }),
    };
    const response = await fetch(
      "http://localhost:8082/post/" + postId + "/comment",
      requestOptions
    );
    props.refreshPage();
    getPosts(props.user.username);
  }
  return (
    <div className={"post-list-profile"}>
      {posts.map((post, index) => (
        <div className={"post-profile"} key={post.id}>
          <p>{user.name + " " + user.surname}</p>
          <p>{post.description}</p>
          <Image width="100%" height="auto" src={post.image} />
          <div className={"likes"}>
            {post.likedUserIds.length} Likes {post.dislikedUserIds.length}{" "}
            Dislikes {post.comments.length} Comments
          </div>
          {username && (
            <ButtonToolbar style={{ width: "100%" }}>
              <ButtonGroup className="mb-2" style={{ width: "25%" }}>
                <Button
                  variant="outline-secondary"
                  onClick={() => LikePost(post.id)}
                >
                  <AiOutlineLike
                    style={{ height: 20, width: 20, marginBottom: 4 }}
                  />
                  {"  "}
                  Like
                </Button>
              </ButtonGroup>
              <ButtonGroup className="mb-2" style={{ width: "25%" }}>
                <Button
                  variant="outline-secondary"
                  onClick={() => DislikePost(post.id)}
                >
                  <AiOutlineDislike style={{ height: 20, width: 20 }} />
                  {"  "}
                  Dislike
                </Button>
              </ButtonGroup>
              <ButtonGroup className="mb-2" style={{ width: "25%" }}>
                <Button
                  variant="outline-secondary"
                  onClick={() => ShowComments(index)}
                >
                  <BiCommentDetail style={{ height: 20, width: 20 }} /> Comments
                </Button>
              </ButtonGroup>
              <ButtonGroup className="mb-2" style={{ width: "25%" }}>
                <Button variant="outline-secondary">
                  <IoIosShareAlt
                    style={{ height: 20, width: 20, marginBottom: 2 }}
                  />{" "}
                  Share
                </Button>
              </ButtonGroup>
            </ButtonToolbar>
          )}

          <div
            className="comment-section"
            ref={(el) => (refs.current[index] = el)}
            style={{ display: "none" }}
          >
            {username && (
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
            )}
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
