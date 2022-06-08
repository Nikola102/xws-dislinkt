import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Register = ({ handler }) => {
  let [registerUser, setRegisterUser] = useState({
    username: "",
    password: "",
    name: "",
    surname: "",
    email: "",
    phone: "",
    gender: "",
    bio: "",
    experience: "",
    education: "",
    skills: "",
    interests: "",
  });
  let navigate = useNavigate();
  const handleChange = (item_id, e) => {
    let updatedValue = {};
    updatedValue[item_id] = e.target.value;
    setRegisterUser((registerUser) => ({ ...registerUser, ...updatedValue }));
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
        username: registerUser.username,
        password: registerUser.password,
        name: registerUser.name,
        surname: registerUser.surname,
        email: registerUser.email,
        phone: registerUser.phone,
        gender: registerUser.gender,
        bio: registerUser.bio,
        experience: registerUser.experience,
        education: registerUser.education,
        skills: registerUser.skills,
        interests: registerUser.interests,
        isPrivate: false,
        following: [],
        followRequests: [],
        apiToken: null,
      }),
    };
    const response = await fetch("http://localhost:8088/user", requestOptions);
    const body = await response.json();
    handler(body);
    sessionStorage.setItem("username", registerUser.username);
    sessionStorage.setItem("userId", body.id);
    navigate("/feed", { replace: true });
  }

  return (
    <div className={"register-background"}>
      <div className={"login"}>
        <h1 className={"dislinkt-title"}>Dislinkt</h1>
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
          <Form.Group className="mb-3" controlId="formBasicGender">
            <Form.Label>Gender</Form.Label>
            <Form.Select onChange={(e) => handleChange("gender", e)}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicBio">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Bio"
              onChange={(e) => handleChange("bio", e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicExperience">
            <Form.Label>Experience</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Experience"
              onChange={(e) => handleChange("experience", e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEducation">
            <Form.Label>Education</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Education"
              onChange={(e) => handleChange("education", e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicSkills">
            <Form.Label>Skills</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Skills"
              onChange={(e) => handleChange("skills", e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicInterests">
            <Form.Label>Interests</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Interests"
              onChange={(e) => handleChange("interests", e)}
            />
          </Form.Group>
          <Button
            variant="outline-secondary"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Register;
