import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Login = ({ handler }) => {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let navigate = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ username: username, password: password }),
    };
    const response = await fetch(
      "http://localhost:8088/user/login",
      requestOptions
    );
    const body = await response.json();
    handler(body);
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("userId", body.id);
    navigate("/feed", { replace: true });
  }
  return (
    <div className="login">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="outline-primary" type="submit" onClick={handleSubmit}>
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
