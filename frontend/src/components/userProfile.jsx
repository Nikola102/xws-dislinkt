import React, { useState, useEffect } from "react";
import Posts from "./posts";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Layout from "./layout";
import RegisteredLayout from "./registeredLayout";
import { FiEdit2 } from "react-icons/fi";
import { BiBlock } from "react-icons/bi";
import { AiOutlineMessage, AiOutlineUser } from "react-icons/ai";

const UserProfile = (props) => {
  let [user, setUser] = useState({ posts: [] });
  let username = sessionStorage.getItem("username");
  let navigate = useNavigate();
  let [loggedInUser, setLoggedInUser] = useState({});
  useEffect(() => {
    setUser(props.user);
  }, [props.user]);
  function follow() {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ followerId: username, toFollowId: user.username }),
    };
    fetch("http://localhost:8088/user/follow", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLoggedInUser(data);
      });
  }
  function edit() {
    navigate("/" + username + "/edit", { replace: true });
  }

  return (
    <div>
      {" "}
      {!username && <Layout handler={props.handler} />}
      {username && <RegisteredLayout profile={user} />}
      <div className={"profile-page"}>
        <div className={"profile-page-image"}>
          <Image rounded src="user.png" width="200" height="200" align="left" />
          <h1>{user.name + " " + user.surname}</h1>
          {username && username === user.username && (
            <Row className={"profile-view-row"}>
              <Col>
                <Button className="profile-btn" onClick={() => edit()}>
                  <FiEdit2 style={{ height: 20, width: 20 }} />
                  {"  "} Edit
                </Button>
              </Col>
            </Row>
          )}
          {username && username !== user.username && (
            <Row className={"profile-view-row"}>
              <Col>
                <Button className="profile-btn" onClick={() => follow()}>
                  <AiOutlineUser
                    style={{ height: 20, width: 20, marginBottom: 2 }}
                  />{" "}
                  Follow
                </Button>
              </Col>
              <Col>
                <Button variant="outline-primary" className="profile-btn">
                  <AiOutlineMessage
                    style={{ height: 20, width: 20, marginBottom: 2 }}
                  />{" "}
                  Message
                </Button>
              </Col>
              <Col>
                <Button variant="outline-danger" className="profile-btn">
                  <BiBlock style={{ height: 20, width: 20, marginBottom: 2 }} />{" "}
                  Block
                </Button>
              </Col>
            </Row>
          )}
          {!username && (
            <Row className={"profile-view-row"}>
              <Col>
                <Button disabled className="profile-btn">
                  Follow
                </Button>
              </Col>
              <Col>
                <Button
                  disabled
                  variant="outline-primary"
                  className="profile-btn"
                >
                  Message
                </Button>
              </Col>
              <Col>
                <Button
                  disabled
                  variant="outline-danger"
                  className="profile-btn"
                >
                  Block
                </Button>
              </Col>
            </Row>
          )}
        </div>
        <div className={"profile-page-body"}>
          <h3 className={"profile-h3"}>{user.name}'s activity</h3>
        </div>
        <Posts user={user} refreshPage={props.refreshPage} />
      </div>
    </div>
  );
};

export default UserProfile;
