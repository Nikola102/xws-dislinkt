import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import RegisteredLayout from "./registeredLayout";
import Form from "react-bootstrap/esm/Form";

const JobOffers = (props) => {
  let [jobOffers, setJobOffers] = useState([]);
  let [apiTokenDislinkt, setApiTokenDislinkt] = useState("");
  let [apiToken, setApiToken] = useState("");
  let username = sessionStorage.getItem("username");
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
    fetch("http://localhost:8089/joboffer/company/" + props.company.id, {
      headers: {
        "Access-Control-Allow-Origin": "*",
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
    props.refreshPage(username);
  }
  useEffect(() => {
    getJobOffers();
    getDislinktUser();
  }, []);
  return (
    <div>
      <RegisteredLayout profile={props.user} />
      {props.user.apiToken === apiTokenDislinkt && (
        <p style={{ color: "white" }}>{apiTokenDislinkt}</p>
      )}
      {props.user.apiToken !== apiTokenDislinkt && (
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
