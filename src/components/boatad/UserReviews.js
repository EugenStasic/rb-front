import React from 'react';
import { ListGroup, Image, Container, Row, Col, Card } from 'react-bootstrap';
import { faStar, faStarHalfAlt, faStar as farStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserReviews = ({ reviews, boatData }) => {
    const bufferToBase64 = (buffer) => {
        const binary = buffer.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
        return window.btoa(binary);
    };

    const renderHeader = () => {
        if (boatData.averageRating > 0) {
            return (
                <>
                    <FontAwesomeIcon icon={faStar} style={{ color: 'gold' }} />
                    {` ${boatData.averageRating} (${boatData.ratingsCount} reviews)`}
                </>
            );
        } else {
            return "This boat has not been rated.";
        }
    };

    const StarRating = ({ rating }) => {
        const totalStars = 5;
        let stars = [];
      
        for (let i = 1; i <= totalStars; i++) {
          if (i <= rating) {
            stars.push(<FontAwesomeIcon key={i} icon={faStar} style={{ color: 'gold' }} />);
          } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
            stars.push(<FontAwesomeIcon key={i} icon={faStarHalfAlt} style={{ color: 'gold' }} />);
          } else {
            stars.push(<FontAwesomeIcon key={i} icon={farStar} style={{ color: 'grey' }} />);
          }
        }
      
        return <div>{stars}</div>;
    };

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
                    <Card.Header as="h2" className="text-center" style={linkStyle}>
                            {renderHeader()}
                        </Card.Header>
                        <ListGroup variant="flush">
                            {reviews.length > 0 ? (
                                reviews.map((review, index) => (
                                    <React.Fragment key={review._id}>
                                        <ListGroup.Item className="review">
                                            <Row className="mb-2">
                                                <Col xs="auto" className="pr-2">
                                                    {review.userId.profilePic && review.userId.profilePic.data && (
                                                        <Image
                                                            src={`data:${review.userId.profilePic.contentType};base64,${bufferToBase64(review.userId.profilePic.data.data)}`}
                                                            alt={`${review.userId.firstName}'s Profile`}
                                                            roundedCircle
                                                            style={{ width: '50px', height: '50px' }}
                                                        />
                                                    )}
                                                </Col>
                                                <Col>
                                                    <Row className="justify-content-between align-items-center">
                                                        <Col>
                                                            <div className="font-weight-bold">
                                                                {review.userId.firstName} {review.userId.lastName}
                                                            </div>
                                                            <div className="text-muted">
                                                                Reviewed on: {new Date(review.createdAt).toLocaleDateString()}
                                                            </div>
                                                        </Col>
                                                        <Col xs="auto">
                                                            <StarRating rating={review.rating} />
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <div className="review-comment" style={textStyle}>
                                                        {review.comment}
                                                    </div>
                                                </Col>
                                            </Row>
                                            {index !== reviews.length - 1 && <hr />} 
                                        </ListGroup.Item>
                                    </React.Fragment>
                                ))
                            ) : (
                                <p className="text-center" style={textStyle}>No reviews yet.</p>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default UserReviews;