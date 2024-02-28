import React from 'react';
import styles from "./BoatDetails.module.css";
import { Card, ListGroup, Container, Row, Col } from "react-bootstrap";

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

  const ownerName = ownerData ? ownerData.firstName : "Loading owner...";

  return (
    <Container fluid>
      <Row className={`my-4 ${styles.customStyle}`}>
        <Col md={10} lg={8}>
          <Card className={`mb-3 ${styles.card}`}>
            <Card.Header as="h2" className={styles.cardHeader}>
              Boat Offered by {ownerName}
            </Card.Header>
            <Card.Body>
              <Card.Title className={styles.cardTitle}>
                {manufacturer} {model}
              </Card.Title>
              <Card.Text className={styles.cardText}>
                {description.split("\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </Card.Text>
              <hr />

              <Row>
                <Col md={6}>
                  <ListGroup className={`my-3 ${styles.listGroup}`}>
                    <ListGroup.Item className={styles.listGroupItem}>
                      <strong>Boat Features</strong>
                    </ListGroup.Item>
                    <ListGroup.Item className={styles.listGroupItem}>
                      Capacity: {onboardCapacity} people
                    </ListGroup.Item>
                    <ListGroup.Item className={styles.listGroupItem}>
                      Length: {boatLength} meters
                    </ListGroup.Item>
                    <ListGroup.Item className={styles.listGroupItem}>
                      Power: {enginePower} HP
                    </ListGroup.Item>
                    <ListGroup.Item className={styles.listGroupItem}>
                      Engine Type: {engineType}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={6}>
                  <ListGroup className={`my-3 ${styles.listGroup}`}>
                    <ListGroup.Item className={styles.listGroupItem}>
                      <strong>Conditions</strong>
                    </ListGroup.Item>
                    <ListGroup.Item className={styles.listGroupItem}>
                      Boat License Requirement: {boatLicenseRequirement}
                    </ListGroup.Item>
                    <ListGroup.Item className={styles.listGroupItem}>
                      Cancellation Conditions: {cancellationConditions}
                    </ListGroup.Item>
                    <ListGroup.Item className={styles.listGroupItem}>
                      Check-In Time: {checkInTime}
                    </ListGroup.Item>
                    <ListGroup.Item className={styles.listGroupItem}>
                      Check-Out Time: {checkOutTime}
                    </ListGroup.Item>
                    <ListGroup.Item className={styles.listGroupItem}>
                      Fuel Cost: {fuelCost}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
              <hr />

              <Row>
                <Col md={6}>
                  <ListGroup variant="flush">
                    <ListGroup.Item className={styles.listGroupItem}>
                      <strong>Navigation Equipment</strong>
                    </ListGroup.Item>
                    {equipment.navigationEquipment.map((item, index) => (
                      <ListGroup.Item
                        key={`nav-${index}`}
                        className={styles.listGroupItem}
                      >
                        {item}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Col>
                <Col md={6}>
                  <ListGroup variant="flush">
                    <ListGroup.Item className={styles.listGroupItem}>
                      <strong>Boat Equipment</strong>
                    </ListGroup.Item>
                    {equipment.boatEquipment.map((item, index) => (
                      <ListGroup.Item
                        key={`boat-${index}`}
                        className={styles.listGroupItem}
                      >
                        {item}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Col>
              </Row>
              <hr />

              <ListGroup variant="flush">
                <ListGroup.Item className={styles.listGroupItem}>
                  <strong>Water Sports</strong>
                </ListGroup.Item>
                {equipment.waterSportsEquipment.map((item, index) => (
                  <ListGroup.Item
                    key={`water-${index}`}
                    className={styles.listGroupItem}
                  >
                    {item}
                  </ListGroup.Item>
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