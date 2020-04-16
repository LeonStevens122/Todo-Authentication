// JavaScript source code

import Form from "react-bootstrap/Form";
import {  Button, Col } from "react-bootstrap";
import React, { useState } from "react";
import Axios from "axios";


export function FormUpdateCars() {
  

  const [oldMake, setOldMake] = useState();
  const [newMake, setNewMake] = useState();

    const handleSubmit = () => {
        console.log('handleSubmit Running');

        console.log('old Make : ', oldMake);
        console.log('new Make : ', newMake);

     Axios({
      method: "PUT",
      url: "./cars/updateInBulk/",
      data: {
        oldMake: oldMake,
        newMake: newMake
         },
     }).catch((error) => { console.log('Axios Error Message : ', error ) } ).then((res) => {
      console.log("Make updated", res);
    });
  };

  return (
    <div>
      <Form >
        <Form.Row>
          <Form.Group as={Col} controlId="validationCustom01">
            <Form.Label>Old Make</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Old Make"
              defaultValue="Make"
              onChange={(e) => {
                setOldMake(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="validationCustom02">
            <Form.Label>New Make</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="New Make"
              defaultValue="New Make"
              onChange={(e) => {
                setNewMake(e.target.value);
              }}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Button onClick={handleSubmit} className="submitButton">
            Update All
          </Button>
        </Form.Row>
      </Form>
    </div>
  );
}
