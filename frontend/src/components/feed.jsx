import React, { useState, useEffect } from "react";
import FeedPosts from "./feedPosts";
import RegisteredLayout from "./registeredLayout";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import { Col, Container, Row } from "react-bootstrap";

const Feed = (props) => {
  let [posts, setPosts] = useState([]);
  let [user, setUser] = useState({ posts: [] });
  let [file, setFile] = useState(null);
  let [base64URL, setBase64URL] = useState("");
  let [img, setImg] = useState("");
  let [description, setDescription] = useState("");
  let getBase64 = (file) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onloadend = () => {
        // Make a fileInfo Object

        baseURL = reader.result;

        resolve(baseURL);
      };
    });
  };
  let handleFileInputChange = (e) => {
    let fileHelper = e.target.files[0];
    setFile(fileHelper);
    getBase64(fileHelper)
      .then((result) => {
        fileHelper["base64"] = result;
        setBase64URL(result);
      })
      .catch((err) => {
        console.log(err);
      });
    setFile(fileHelper);
    handleShow();
  };
  const handleClose = () => (img.style.display = "none");
  const handleShow = () => (img.style.display = "");
  useEffect(() => {
    setUser(props.user);
    setPosts(props.posts);
    setImg(document.getElementById("img-for-posting"));
  }, [props.posts, props.user]);
  async function makePost() {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        title: user.name + "" + user.surname,
        description: description,
        image: base64URL,
        userId: user.id,
        username: user.username,
        likedUserIds: [],
        dislikeUserIds: [],
        comments: [],
      }),
    };
    const response = await fetch("http://localhost:8082/post/", requestOptions);
    const body = await response.json();
    props.refreshPage();
    alert("You have sucessfully posted on your wall!");
    handleClose();
  }
  return (
    <div className={"background"}>
      <div>
        <RegisteredLayout profile={user} />
      </div>
      <div className={"feed-body"}>
        <div className={"feed-post"}>
          <InputGroup>
            <Container fluid>
              <div className="text-and-image-post">
                <Row>
                  <Col>
                    <FormControl
                      placeholder="What are you thinking about?..."
                      aria-label="Post content"
                      className={"text-post"}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Image
                      id="img-for-posting"
                      src={base64URL}
                      width="150"
                      height="150"
                      style={{ display: "none" }}
                    />
                  </Col>
                </Row>
              </div>
              <Row>
                <Col sm={10}>
                  <Form.Group>
                    <Form.Control
                      id="image-post"
                      type="file"
                      onChange={handleFileInputChange}
                    />
                  </Form.Group>
                </Col>
                <Col sm={2}>
                  <Button
                    variant="outline-secondary"
                    id="button-post"
                    onClick={makePost}
                  >
                    Post
                  </Button>
                </Col>
              </Row>
            </Container>
          </InputGroup>
        </div>
        <FeedPosts posts={posts} user={user} refreshPage={props.refreshPage} />
      </div>
    </div>
  );
};

export default Feed;
