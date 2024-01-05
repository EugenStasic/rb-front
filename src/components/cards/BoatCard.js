import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Badge, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUsers, faBolt, faMapMarkerAlt, faRulerHorizontal } from '@fortawesome/free-solid-svg-icons';
import defaultImage from '../../assets/images/MissingImage.PNG';

const BoatCard = ({ boat, imageUrl }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/boatad/${boat._id}`);
    };

    const renderRating = () => {
        if (boat.averageRating > 0) {
            return (
                <>
                    <FontAwesomeIcon icon={faStar} style={{ color: 'gold' }} />
                    {` ${boat.averageRating} `}
                    <span className="text-muted">({boat.ratingsCount})</span>
                </>
            );
        } else {
            return <span className="text-muted">Not Rated</span>;
        }
    };

    return (
        <Card className="boat-card mb-3" style={{ cursor: 'pointer' }}>
            <Card.Img variant="top" src={imageUrl || defaultImage} alt={`${boat.generalInformation.manufacturer} ${boat.generalInformation.model}`} style={{ objectFit: 'cover', aspectRatio: '3 / 2' }} />
            <Card.Body>
                <Row>
                    <Col md={8}>
                        <Card.Title>
                            {boat.generalInformation.manufacturer} {boat.generalInformation.model}
                        </Card.Title>
                    </Col>
                    <Col md={4} className="text-end">
                        {renderRating()}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FontAwesomeIcon icon={faMapMarkerAlt} title="Location" /> {boat.generalInformation.cityHarbour.city}
                    </Col>
                    <Col>
                        <FontAwesomeIcon icon={faBolt} title="Engine Power" /> {boat.technicalInformation.enginePower} HP
                    </Col>
                    <Col>
                        <FontAwesomeIcon icon={faRulerHorizontal} title="Boat Length" /> {boat.technicalInformation.boatLength}m
                    </Col>
                    <Col>
                        <FontAwesomeIcon icon={faUsers} title="Capacity" /> {boat.technicalInformation.onboardCapacity}
                    </Col>
                </Row>
                <div className="d-flex justify-content-between align-items-center mt-2">
                    <Badge bg="primary">From {boat.pricing.referencePrice},00€ per day</Badge>
                    <Button variant="outline-primary" size="sm" onClick={(e) => { e.stopPropagation(); handleNavigate(); }}>View Details</Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default BoatCard;