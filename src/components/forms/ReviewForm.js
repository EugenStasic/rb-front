import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { submitReview } from '../../actions/reviewActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import './ReviewForm.css'; 

const ReviewForm = ({ boatId, onClose }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(submitReview(boatId, rating, comment));
        onClose();
    };

    const handleMouseOver = (newHoverRating) => {
        setHoverRating(newHoverRating);
    };

    const handleMouseLeave = () => {
        setHoverRating(0);
    };

    const handleClick = (newRating) => {
        setRating(newRating);
    };

    const renderStars = () => {
        return [...Array(5)].map((_, index) => {
          const ratingValue = index + 1;
          return (
            <FontAwesomeIcon
              key={ratingValue}
              className={`star ${ratingValue <= (hoverRating || rating) ? 'filled' : ''}`}
              icon={ratingValue <= (hoverRating || rating) ? solidStar : regularStar}
              onMouseEnter={() => handleMouseOver(ratingValue)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(ratingValue)}
            />
          );
        });
      };

    return (
        <Card>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Group controlId="formRating">
                                <Form.Label>Rating:</Form.Label>
                                <div className="stars">{renderStars()}</div>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="formComment">
                                <Form.Label>Comment:</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Enter your review..."
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button variant="primary" type="submit">Submit Review</Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default ReviewForm;