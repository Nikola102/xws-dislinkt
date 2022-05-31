import React, { useState, useEffect } from "react";
import FeedPosts from "./feedPosts";
import RegisteredLayout from "./registeredLayout";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

const Feed = (props) => {
  let [posts, setPosts] = useState([]);
  let [user, setUser] = useState({ posts: [] });
  useEffect(() => {
    setUser(props.user);
    setPosts(props.posts);
  }, [props.posts, props.user]);
  return (
    <div>
      <div>
        <RegisteredLayout profile={user} />
      </div>
      <div className={"feed-body"}>
        <div className={"feed-post"}>
          <InputGroup className="mb-3 ">
            <FormControl
              placeholder="What are you thinking about?..."
              aria-label="Post content"
            />
            <Button variant="outline-secondary" id="button-post">
              Post
            </Button>
          </InputGroup>
          <Form.Group controlId="formFileSm" className="mb-3">
            <Form.Control type="file" size="sm" />
          </Form.Group>
        </div>
        <FeedPosts posts={posts} user={user} />
      </div>
    </div>
  );
};

export default Feed;
