import React from "react";
import {  Row, Col, Container } from "react-bootstrap";

export function ShowCars({ carList }) {

  return (
    <div className="carList">
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
    </div>
  );
}
