// JavaScript source code

import Form from "react-bootstrap/Form";
import { InputGroup, Button, Col } from "react-bootstrap";
import React, { useState, Component } from "react";
const Axios = require("axios");

export function FormAddCars() {
  const [validated, setValidated] = useState(false);
  const [newModel, setModel] = useState();
  const [newMake, setMake] = useState();
  const [newOwner, setOwner] = useState();
  const [newRegistration, setRegistration] = useState();
  const [newAddress, setAddress] = useState();

  const handleSubmit = (event) => {
    const newCar = {
      model: newModel,
      make: newMake,
      owner: newOwner,
      registration: newRegistration,
      address: newAddress,
    };

    console.log("Generated object: ", newCar);
    Axios.post("./cars/add", newCar);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col} controlId="validationCustom01">
          <Form.Label>Model</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Model"
            defaultValue="Model"
            onChange={(e) => {
              setModel(e.target.value);
            }}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="validationCustom02">
          <Form.Label>Make</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Make"
            defaultValue="Make"
            onChange={(e) => {
              setMake(e.target.value);
            }}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} controlId="validationCustom02">
          <Form.Label>Owner</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Owner"
            defaultValue="Owner"
            onChange={(e) => {
              setOwner(e.target.value);
            }}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} controlId="validationCustom02">
          <Form.Label>Registration</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Registration"
            defaultValue="Registration"
            onChange={(e) => {
              setRegistration(e.target.value);
            }}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} controlId="validationCustom02">
          <Form.Label>Address</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Address"
            defaultValue="Address"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Button onClick={handleSubmit} className="submitButton" type="submit">
          Submit form
        </Button>
      </Form.Row>
    </Form>
  );
}
