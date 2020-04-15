// JavaScript source code

import Form from "react-bootstrap/Form";
import { InputGroup, Button, Col } from "react-bootstrap";
import React, { useState, Component } from "react";
import Axios from 'axios';
import { useEffect } from "react";

export function FormUpdateCars() {
    const [validated, setValidated] = useState(false);
    const [carList , setCarList] = useState([]);

  const [model, setModel] = useState();
  const [make, setMake] = useState();
  const [owner, setOwner] = useState();
  const [registration, setRegistration] = useState();
  const [address, setAddress] = useState();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

    // import JSON from file and write to state
    const getCars = () => {
        Axios.get("./cars/").then((result) => {
            setCarList(result.data);
            console.log(' List of Cars :  ',  result.data);
        });
    };

    return (
      <div>
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col} controlId="validationCustom01">
          <Form.Label>Model</Form.Label>
          <Form.Control
                        required
                        type="text"
                        placeholder="Model"
                        defaultValue="Model"
                        onChange={(e) => { setModel(e.target.value) }}
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
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Button className="submitButton" >
          Update All 
        </Button>
      </Form.Row>
    </Form >

            <div>
                <br />
                <select id="cars">
                    {}

                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                </select>
                </div>

            </div>
  );
}
