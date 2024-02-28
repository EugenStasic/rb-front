import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUsers, faBolt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import defaultImage from '../../assets/images/MissingImage.PNG';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./MyBoatCard.module.css";
const MyBoatCard = ({ boat, onEdit, onDelete, imageUrl }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/boatad/${boat._id}`);
  };

  const renderRating = () => {
    if (boat.averageRating > 0) {
      return (
        <span>
          <FontAwesomeIcon icon={faStar} style={{ color: "gold" }} />
          {` ${boat.averageRating} `}
          <span className={styles["text-muted"]}>({boat.ratingsCount})</span>
        </span>
      );
    } else {
      return <span className={styles["text-muted"]}>Not Rated</span>;
    }
  };

  return (
    <Card
      className={`${styles["boat-card"]} mb-3`}
      style={{ cursor: "pointer" }}
    >
      <Card.Img
        variant="top"
        src={imageUrl || defaultImage}
        alt={`${boat.generalInformation.manufacturer} ${boat.generalInformation.model}`}
        className={`${styles["card-img-top"]}`}
        style={{ aspectRatio: "3/2" }}
      />
      <Card.Body>
        <Row className="justify-content-between align-items-center">
          <Col md={8}>
            <Card.Title className={styles["card-title"]}>
              {boat.generalInformation.manufacturer}{" "}
              {boat.generalInformation.model}
            </Card.Title>
          </Col>
          <Col md={4} className={`${styles["text-end"]}`}>
            {renderRating()}
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={4}>
            <FontAwesomeIcon icon={faMapMarkerAlt} title="Location" />{" "}
            {boat.generalInformation.cityHarbour.city}
          </Col>
          <Col xs={12} md={4}>
            <FontAwesomeIcon icon={faBolt} title="Engine Power" />{" "}
            {boat.technicalInformation.enginePower} HP
          </Col>
          <Col xs={12} md={4}>
            <FontAwesomeIcon icon={faUsers} title="Capacity" />{" "}
            {boat.technicalInformation.onboardCapacity}
          </Col>
        </Row>
        <Row className={`${styles["mt-2"]}`}>
          <Col>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(boat._id);
              }}
            >
              Edit
            </Button>
            <Button
              variant="outline-danger"
              size="sm"
              className={`${styles["ms-2"]}`}
              onClick={(e) => {
                e.stopPropagation();
                onDelete(boat._id);
              }}
            >
              Delete
            </Button>
          </Col>
          <Col className={`${styles["text-end"]}`}>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleNavigate();
              }}
            >
              View Details
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default MyBoatCard;