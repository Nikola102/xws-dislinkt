import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ user }) => {
  let navigate = useNavigate();
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
  useEffect(() => {
    setEditedUser({
      username: user.username,
      password: user.password,
      name: user.name,
      surname: user.surname,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
      bio: user.bio,
      experience: user.experience,
      education: user.education,
      skills: user.skills,
      interests: user.interests,
    });
  }, []);
  const handleChange = (item_id, e) => {
    let updatedValue = {};
    updatedValue[item_id] = e.target.value;
    setEditedUser((editedUser) => ({ ...editedUser, ...updatedValue }));
  };
  async function handleSubmit(event) {
    event.preventDefault();
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        id: user.id,
        username: editedUser.username,
        password: editedUser.password,
        name: editedUser.name,
        surname: editedUser.surname,
        email: editedUser.email,
        phone: editedUser.phone,
        gender: editedUser.gender,
        bio: editedUser.bio,
        experience: editedUser.experience,
        education: editedUser.education,
        skills: editedUser.skills,
        interests: editedUser.interests,
        isPrivate: user.isPrivate,
        following: user.following,
        followRequests: user.followRequests,
      }),
    };
    const response = await fetch("http://localhost:8088/user", requestOptions);
    const body = await response.json();
    alert("Saved changes successfuly!");
    sessionStorage.clear();
    sessionStorage.setItem("username", editedUser.username);
    sessionStorage.setItem("userId", user.id);
    navigate("/feed", { replace: true });
  }
  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            onChange={(e) => handleChange("name", e)}
            defaultValue={user.name}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicSurname">
          <Form.Label>Surname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Surname"
            onChange={(e) => handleChange("surname", e)}
            defaultValue={user.surname}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            onChange={(e) => handleChange("username", e)}
            defaultValue={user.username}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Password"
            onChange={(e) => handleChange("password", e)}
            defaultValue={user.password}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            onChange={(e) => handleChange("email", e)}
            defaultValue={user.email}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Phone"
            onChange={(e) => handleChange("phone", e)}
            defaultValue={user.phone}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicGender">
          <Form.Label>Gender</Form.Label>
          <Form.Select
            onChange={(e) => handleChange("gender", e)}
            defaultValue={user.gender}
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
            defaultValue={user.bio}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicExperience">
          <Form.Label>Experience</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Experience"
            onChange={(e) => handleChange("experience", e)}
            defaultValue={user.experience}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEducation">
          <Form.Label>Education</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Education"
            onChange={(e) => handleChange("education", e)}
            defaultValue={user.education}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicSkills">
          <Form.Label>Skills</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Skills"
            onChange={(e) => handleChange("skills", e)}
            defaultValue={user.skills}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicInterests">
          <Form.Label>Interests</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Interests"
            onChange={(e) => handleChange("interests", e)}
            defaultValue={user.interests}
          />
        </Form.Group>
        <Button
          variant="outline-primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Save Changes
        </Button>
      </Form>
    </div>
  );
};

export default EditProfile;
