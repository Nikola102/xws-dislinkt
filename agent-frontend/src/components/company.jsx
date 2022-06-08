import React, { useState, useEffect } from "react";
import RegisteredLayout from "./registeredLayout";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Company = (props) => {
  let [company, setCompany] = useState({
    name: "",
    description: "",
    culture: "",
    mail: "",
    phone: "",
    approved: false,
    ownerId: "",
    ownerUsername: "",
    comments: [],
  });
  let username = sessionStorage.getItem("username");
  const handleChange = (item_id, e) => {
    let updatedValue = {};
    updatedValue[item_id] = e.target.value;
    setCompany((company) => ({
      ...company,
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
        name: company.name,
        description: company.description,
        culture: company.culture,
        email: company.email,
        phone: company.phone,
        approved: company.approved,
        ownerId: props.user.id,
        ownerUsername: username,
        comments: company.comments,
      }),
    };
    const response = await fetch(
      "http://localhost:8089/company",
      requestOptions
    );
    const body = await response.json();
  }

  async function getCompanyByOwner() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const response = await fetch(
      "http://localhost:8089/company/owner/" + username,
      requestOptions
    );
    const body = await response.json();
    setCompany(body);
  }
  useEffect(() => {
    getCompanyByOwner();
  }, []);
  return (
    <div>
      <RegisteredLayout profile={props.user} />
      <div
        style={{
          backgroundColor: "white",
          padding: "2%",
          borderRadius: "10px",
        }}
      >
        <h1> Create Company </h1>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name of Company</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              onChange={(e) => handleChange("name", e)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Company Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Describe your company"
              onChange={(e) => handleChange("description", e)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Company Culture</Form.Label>
            <Form.Control
              type="text"
              placeholder="Describe your company's culture"
              onChange={(e) => handleChange("culture", e)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => handleChange("email", e)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter phone number"
              onChange={(e) => handleChange("Phone", e)}
            />
          </Form.Group>
          <Button
            variant="secondary"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Submit request
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Company;
