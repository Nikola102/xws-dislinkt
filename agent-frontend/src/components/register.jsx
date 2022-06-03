import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Register = ({ handler }) => {
  let [registerAgent, setRegisterAgent] = useState({
    username: "",
    password: "",
    name: "",
    surname: "",
    email: "",
    phone: "",
    gender: "",
  });
  let navigate = useNavigate();
  const handleChange = (item_id, e) => {
    let updatedValue = {};
    updatedValue[item_id] = e.target.value;
    setRegisterAgent((registerAgent) => ({
      ...registerAgent,
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
        username: registerAgent.username,
        password: registerAgent.password,
        name: registerAgent.name,
        surname: registerAgent.surname,
        email: registerAgent.email,
        phone: registerAgent.phone,
        owner: false,
      }),
    };
    const response = await fetch(
      "http://localhost:8088/agent/save",
      requestOptions
    );
    const body = await response.json();
    handler(body);
    sessionStorage.setItem("username", registerAgent.username);
    sessionStorage.setItem("userId", body.id);
    navigate("/feed", { replace: true });
  }

  return (
    <div className={"register"}>
      <h1 style={{ textAlign: "center" }}>Agent Dislinkt</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            onChange={(e) => handleChange("name", e)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicSurname">
          <Form.Label>Surname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Surname"
            onChange={(e) => handleChange("surname", e)}
          />
        </Form.Group>
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
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            onChange={(e) => handleChange("email", e)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Phone"
            onChange={(e) => handleChange("phone", e)}
          />
        </Form.Group>
        <Button
          variant="secondary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Register;
