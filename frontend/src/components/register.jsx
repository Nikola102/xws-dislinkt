import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Register = () => {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [name, setName] = useState("");
  let [surname, setSurname] = useState("");
  let [email, setEmail] = useState("");
  let [phone, setPhone] = useState("");
  let [gender, setGender] = useState("");
  let [bio, setBio] = useState("");
  let [experience, setExperience] = useState("");
  let [education, setEducation] = useState("");
  let [skills, setSkills] = useState("");
  let [interests, setInterests] = useState("");

  return (
    <div className={"register"}>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicSurname">
          <Form.Label>Surname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Surname"
            onChange={(e) => setSurname(e.target.value)}
          />
        </Form.Group>
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
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Phone"
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicGender">
          <Form.Label>Gender</Form.Label>
          <Form.Select onChange={(e) => setGender(e.target.value)}>
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
            onChange={(e) => setBio(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicExperience">
          <Form.Label>Experience</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Experience"
            onChange={(e) => setExperience(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEducation">
          <Form.Label>Education</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Education"
            onChange={(e) => setEducation(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicSkills">
          <Form.Label>Skills</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Skills"
            onChange={(e) => setSkills(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicInterests">
          <Form.Label>Interests</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Interests"
            onChange={(e) => setInterests(e.target.value)}
          />
        </Form.Group>
        <Button
          variant="outline-primary"
          type="submit"
          onClick={() => {
            alert(username + " " + password);
          }}
        >
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Register;
