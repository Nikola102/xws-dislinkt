import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import RegisteredLayout from "./registeredLayout";
import Form from "react-bootstrap/esm/Form";
import Accordion from "react-bootstrap/Accordion";

const JobOffers = ({ company, user, refreshPage }) => {
  let [jobOffers, setJobOffers] = useState([]);
  let [jobOffer, setJobOffer] = useState({
    title: "",
    description: "",
    location: "",
    seniority: "",
    field: "",
    technology: "",
  });
  let [apiTokenDislinkt, setApiTokenDislinkt] = useState("");
  let [apiToken, setApiToken] = useState("");
  let username = sessionStorage.getItem("username");
  const handleChange = (item_id, e) => {
    let updatedValue = {};
    updatedValue[item_id] = e.target.value;
    setJobOffer((jobOffer) => ({ ...jobOffer, ...updatedValue }));
  };
  function getDislinktUser() {
    fetch("http://localhost:8088/user/" + username, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setApiTokenDislinkt(data.apiToken);
      });
  }

  function getJobOffers() {
    fetch("http://localhost:8089/joboffer/company/" + company[0].id, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setJobOffers(data);
      });
  }
  async function saveToken() {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        username: username,
        apiToken: apiToken,
      }),
    };
    const response = await fetch(
      "http://localhost:8089/agent/set/token",
      requestOptions
    );
    const body = await response.json();
    refreshPage(username);
  }
  function postJobOffer() {
    let technologies = jobOffer.technology.split(",");
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        title: jobOffer.title,
        description: jobOffer.description,
        location: jobOffer.location,
        seniority: jobOffer.seniority,
        field: jobOffer.field,
        technology: technologies,
        companyId: company[0].id,
        companyName: company[0].name,
        dislinktPromoted: true,
      }),
    };
    fetch("http://localhost:8089/joboffer/", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setJobOffers((jobOffers) => [...jobOffers, data]);
      });
  }
  useEffect(() => {
    getJobOffers();
    getDislinktUser();
  }, []);
  return (
    <div>
      <RegisteredLayout profile={user} />
      {user.apiToken === apiTokenDislinkt && (
        <Accordion className="jobs">
          {jobOffers.map((joboffer) => (
            <Accordion.Item
              eventKey={joboffer.id}
              className={"job-accordion-item"}
            >
              <Accordion.Header className={"job-accordion-header"}>
                <div>
                  <Row>
                    <Col
                      style={{
                        textAlign: "left",
                        width: "auto",
                        fontSize: "20px",
                        textDecoration: "underlined",
                      }}
                    >
                      {" "}
                      {joboffer.title}
                    </Col>
                  </Row>
                  <Row>
                    <Col style={{ textAlign: "left" }}>
                      {joboffer.companyName}
                    </Col>
                  </Row>
                  <Row>
                    <Col style={{ textAlign: "left" }}>{joboffer.location}</Col>
                  </Row>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <p style={{ fontWeight: "bold" }}>Description:</p>
                {joboffer.description}
                <br />
                <br />
                <p style={{ fontWeight: "bold" }}>Technologies:</p>
                <ul>
                  {joboffer.technology.map((tech) => (
                    <li>{tech}</li>
                  ))}
                </ul>
                <div style={{ textAlign: "right" }}>
                  <Button disabled variant="outline-primary">
                    Apply
                  </Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          ))}
          <Accordion.Item eventKey="1" className={"job-accordion-item"}>
            <Accordion.Header>Add New Job Offer</Accordion.Header>
            <Accordion.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Title"
                    onChange={(e) => handleChange("title", e)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Description"
                    onChange={(e) => handleChange("description", e)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicLocation">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Location"
                    onChange={(e) => handleChange("location", e)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicSeniority">
                  <Form.Label>Seniority</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Seniority"
                    onChange={(e) => handleChange("seniority", e)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicField">
                  <Form.Label>Field</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Field"
                    onChange={(e) => handleChange("field", e)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicTechnology">
                  <Form.Label>Technologies</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Technologies"
                    onChange={(e) => handleChange("technology", e)}
                  />
                </Form.Group>
                <div style={{ textAlign: "right" }}>
                  <Button variant="outline-primary" onClick={postJobOffer}>
                    Create job offer
                  </Button>
                </div>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )}
      {user.apiToken !== apiTokenDislinkt && (
        <div className={"token"}>
          <Form>
            <Form.Label>Api Token</Form.Label>
            <Row>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Copy token from dislinkt"
                  onChange={(e) => setApiToken(e.target.value)}
                />
              </Col>
              <Col>
                <Button variant="outline-secondary" onClick={saveToken}>
                  Save token
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      )}
    </div>
  );
};

export default JobOffers;
