import React from 'react';
import './BoatDetails.css';
import { Card, ListGroup, Container, Row, Col } from 'react-bootstrap';

const BoatDetails = ({ boatData, ownerData }) => {
    const {
        manufacturer,
        model,
        onboardCapacity,
        boatLength,
        enginePower,
        description,
        engineType,
        boatLicenseRequirement,
        cancellationConditions,
        checkInTime,
        checkOutTime,
        fuelCost,
        equipment,
    } = boatData;

    const ownerName = ownerData ? ownerData.firstName : 'Loading owner...';

    const linkStyle = {
      fontFamily: '"Source Sans Pro", sans-serif',
      color: '#34495e',
      fontWeight: 'bold' 
  };

  const textStyle = {
    fontFamily: '"Source Sans Pro", sans-serif',
};

    return (
        <Container fluid>
          <Row className="my-4 custom-style">
            <Col md={10} lg={8}>
              <Card className="mb-3">
                <Card.Header as="h2" style={linkStyle}>Boat Offered by {ownerName}</Card.Header>
                <Card.Body>
                  <Card.Title style={linkStyle}>{manufacturer} {model}</Card.Title>
                  <Card.Text style={textStyle}>
                    {description.split('\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </Card.Text>
                  <hr />

                  <Row>
                    <Col md={6}>
                      <ListGroup className="my-3">
                        <ListGroup.Item style={linkStyle}><strong>Boat Features</strong></ListGroup.Item>
                        <ListGroup.Item style={textStyle}>Capacity: {onboardCapacity} people</ListGroup.Item>
                        <ListGroup.Item style={textStyle}>Length: {boatLength} meters</ListGroup.Item>
                        <ListGroup.Item style={textStyle}>Power: {enginePower} HP</ListGroup.Item>
                        <ListGroup.Item style={textStyle}>Engine Type: {engineType}</ListGroup.Item>
                      </ListGroup>
                    </Col>
                    <Col md={6}>
                      <ListGroup className="my-3">
                        <ListGroup.Item style={linkStyle}><strong>Conditions</strong></ListGroup.Item>
                        <ListGroup.Item style={textStyle}>Boat License Requirement: {boatLicenseRequirement}</ListGroup.Item>
                        <ListGroup.Item style={textStyle}>Cancellation Conditions: {cancellationConditions}</ListGroup.Item>
                        <ListGroup.Item style={textStyle}>Check-In Time: {checkInTime}</ListGroup.Item>
                        <ListGroup.Item style={textStyle}>Check-Out Time: {checkOutTime}</ListGroup.Item>
                        <ListGroup.Item style={textStyle}>Fuel Cost: {fuelCost}</ListGroup.Item>
                      </ListGroup>
                    </Col>
                  </Row>
                  <hr />

                  <Row>
                    <Col md={6}>
                      <ListGroup variant="flush">
                        <ListGroup.Item style={linkStyle}><strong>Navigation Equipment</strong></ListGroup.Item>
                        {equipment.navigationEquipment.map((item, index) => (
                          <ListGroup.Item key={`nav-${index}`} style={textStyle}>{item}</ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Col>
                    <Col md={6}>
                      <ListGroup variant="flush">
                        <ListGroup.Item style={linkStyle}><strong>Boat Equipment</strong></ListGroup.Item>
                        {equipment.boatEquipment.map((item, index) => (
                          <ListGroup.Item key={`boat-${index}`} style={textStyle}>{item}</ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Col>
                  </Row>
                  <hr />

                  <ListGroup variant="flush">
                    <ListGroup.Item style={linkStyle}><strong>Water Sports</strong></ListGroup.Item>
                    {equipment.waterSportsEquipment.map((item, index) => (
                      <ListGroup.Item key={`water-${index}`} style={textStyle}>{item}</ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      );
    };
    
    export default BoatDetails;
