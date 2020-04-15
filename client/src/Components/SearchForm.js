// JavaScript source code

import Form from 'react-bootstrap/Form';
import {  Button, Col } from 'react-bootstrap';
import React, { useState } from 'react';

export function SearchForm() {
    const [validated, setValidated] = useState(false);

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
                <Button className="submitButton" type="submit">Submit form</Button>
            </Form.Row>

        </Form>
    );
}


