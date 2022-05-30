import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let navigate = useNavigate();
  async function handleSubmit(event) {
    sessionStorage.setItem("username", username);
    event.preventDefault();
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
