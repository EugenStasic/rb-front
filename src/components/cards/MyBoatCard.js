import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUsers, faBolt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import defaultImage from '../../assets/images/MissingImage.PNG';
import 'bootstrap/dist/css/bootstrap.min.css';

const MyBoatCard = ({ boat, onEdit, onDelete, imageUrl }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/boatad/${boat._id}`);
    };

    const renderRating = () => {
        if (boat.averageRating > 0) {
            return (
                <span>
                    <FontAwesomeIcon icon={faStar} style={{ color: 'gold' }} />
                    {` ${boat.averageRating} `}
                    <span className="text-muted">({boat.ratingsCount})</span>
                </span>
            );
        } else {
            return <span className="text-muted">Not Rated</span>;
        }
    };

    return (
        <Card className="boat-card mb-3" style={{ cursor: 'pointer' }}>
            <Card.Img variant="top" src={imageUrl || defaultImage} alt={`${boat.generalInformation.manufacturer} ${boat.generalInformation.model}`} style={{ objectFit: 'cover', aspectRatio: '3 / 2' }} />
            <Card.Body>
                <Row className="justify-content-between align-items-center">
                    <Col  md={8}>
                        <Card.Title >
                            {boat.generalInformation.manufacturer} {boat.generalInformation.model}
                        </Card.Title>
                    </Col>
                    <Col  md={4} className="text-end">
                        {renderRating()}
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={4}>
                        <FontAwesomeIcon icon={faMapMarkerAlt} title="Location" /> {boat.generalInformation.cityHarbour.city}
                    </Col>
                    <Col xs={12} md={4}>
                        <FontAwesomeIcon icon={faBolt} title="Engine Power" /> {boat.technicalInformation.enginePower} HP
                    </Col>
                    <Col xs={12} md={4}>
                        <FontAwesomeIcon icon={faUsers} title="Capacity" /> {boat.technicalInformation.onboardCapacity}
                    </Col>
                </Row>
                <Row className="justify-content-between align-items-center mt-2">
                    <Col>
                        <Button variant="outline-secondary" size="sm" onClick={(e) => {
                            e.stopPropagation();
                            onEdit(boat._id);
                        }}>Edit</Button>
                        <Button variant="outline-danger" size="sm" className="ms-2" onClick={(e) => {
                            e.stopPropagation();
                            onDelete(boat._id);
                        }}>Delete</Button>
                    </Col>
                    <Col className="text-end">
                        <Button variant="outline-primary" size="sm" onClick={(e) => {
                            e.stopPropagation();
                            handleNavigate();
                        }}>View Details</Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default MyBoatCard;