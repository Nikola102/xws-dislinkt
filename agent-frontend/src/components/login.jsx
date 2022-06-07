import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  let [loginAgent, setLoginAgent] = useState({
    username: "",
    password: "",
  });
  let navigate = useNavigate();
  const handleChange = (item_id, e) => {
    let updatedValue = {};
    updatedValue[item_id] = e.target.value;
    setLoginAgent((loginAgent) => ({
      ...loginAgent,
      ...updatedValue,
    }));
  };
  async function handleSubmit(event) {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        username: loginAgent.username,
        password: loginAgent.password,
      }),
    };
    const response = await fetch(
      "http://localhost:8089/agent/login",
      requestOptions
    );
    const body = await response.json();
    props.handler(body);
    sessionStorage.setItem("username", loginAgent.username);
    sessionStorage.setItem("agentId", body.id);
    navigate("/company", { replace: true });
  }

  return (
    <div className={"register"}>
      <h1 style={{ textAlign: "center" }}>Agent Dislinkt</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            onChange={(e) => handleChange("username", e)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            onChange={(e) => handleChange("password", e)}
          />
        </Form.Group>
        <Button
          variant="secondary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
