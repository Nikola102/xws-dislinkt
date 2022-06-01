import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const EditProfile = () => {
  let userToken = sessionStorage.getItem("username");
  let [loggedInUser, setLoggedInUser] = useState({});
  let [editedUser, setEditedUser] = useState({
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
  function getLoggedInUser() {
    fetch("http://localhost:8088/user/" + userToken, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLoggedInUser(data);
      });
  }
  useEffect(() => {
    getLoggedInUser();
  }, []);
  const handleChange = (item_id, e) => {
    let updatedValue = {};
    updatedValue[item_id] = e.target.value;
    setEditedUser((editedUser) => ({ ...editedUser, ...updatedValue }));
  };
  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            onChange={(e) => handleChange("name", e)}
            defaultValue={loggedInUser.name}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicSurname">
          <Form.Label>Surname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Surname"
            onChange={(e) => handleChange("surname", e)}
            defaultValue={loggedInUser.surname}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            onChange={(e) => handleChange("username", e)}
            defaultValue={loggedInUser.username}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Password"
            onChange={(e) => handleChange("password", e)}
            defaultValue={loggedInUser.password}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            onChange={(e) => handleChange("email", e)}
            defaultValue={loggedInUser.email}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Phone"
            onChange={(e) => handleChange("phone", e)}
            defaultValue={loggedInUser.phone}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicGender">
          <Form.Label>Gender</Form.Label>
          <Form.Select
            onChange={(e) => handleChange("gender", e)}
            defaultValue={loggedInUser.gender}
          >
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
            defaultValue={loggedInUser.bio}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicExperience">
          <Form.Label>Experience</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Experience"
            onChange={(e) => handleChange("experience", e)}
            defaultValue={loggedInUser.experience}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEducation">
          <Form.Label>Education</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Education"
            onChange={(e) => handleChange("education", e)}
            defaultValue={loggedInUser.education}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicSkills">
          <Form.Label>Skills</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Skills"
            onChange={(e) => handleChange("skills", e)}
            defaultValue={loggedInUser.skills}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicInterests">
          <Form.Label>Interests</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Interests"
            onChange={(e) => handleChange("interests", e)}
            defaultValue={loggedInUser.interests}
          />
        </Form.Group>
        <Button variant="outline-primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </div>
  );
};

export default EditProfile;
