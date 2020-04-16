// JavaScript source code


import {  Button, Col } from 'react-bootstrap';
import React, { useState } from 'react';
import { Row,  Container } from "react-bootstrap";

export function SearchForm() {

    const [model, setModel] = useState();
    const [make, setMake] = useState();
    const [owner, setOwner] = useState();
    const [registration, setRegistration] = useState();
    const [address, setAddress] = useState();
    const [carList, setCarList] = useState([]);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
       
    };

    return (

        <div className="carList">
            <Button onClick={handleSubmit} className="submitButton">
                Delete Car
          </Button>
             

       
            <h1> Cars List </h1>

            <Container fluid>
                <Row>
                    <Col className="carTableHeader">Make</Col>
                    <Col className="carTableHeader">Model</Col>
                    <Col className="carTableHeader">Owner</Col>
                    <Col className="carTableHeader">Registration</Col>
                    <Col className="carTableHeader">Address</Col>
                </Row>
                {carList.map((car, index) => {

                    return (
                        <Row key={index} >
                            <Col className="carTableItem">{car.make}</Col>
                            <Col className="carTableItem">{car.model}</Col>
                            <Col className="carTableItem">{car.owner}</Col>
                            <Col className="carTableItem">{car.registration}</Col>
                            <Col className="carTableItem">{car.address}</Col>
                        </Row>
                    );
                })}
            </Container>
        </div >

            
        
    );
}


