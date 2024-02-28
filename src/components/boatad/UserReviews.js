import React from 'react';
import { ListGroup, Image, Container, Row, Col, Card } from 'react-bootstrap';
import { faStar, faStarHalfAlt, faStar as farStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { arrayBufferToBase64 } from "../../utils/utils";
import styles from "./UserReviews.module.css";

const UserReviews = ({ reviews, boatData }) => {
  const renderHeader = () => {
    if (boatData.averageRating > 0) {
      return (
        <>
          <FontAwesomeIcon icon={faStar} style={{ color: "gold" }} />
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
        stars.push(
          <FontAwesomeIcon key={i} icon={faStar} style={{ color: "gold" }} />
        );
      } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
        stars.push(
          <FontAwesomeIcon
            key={i}
            icon={faStarHalfAlt}
            style={{ color: "gold" }}
          />
        );
      } else {
        stars.push(
          <FontAwesomeIcon key={i} icon={farStar} style={{ color: "grey" }} />
        );
      }
    }

    return <div>{stars}</div>;
  };

  return (
    <Container fluid>
      <Row className={`my-4 ${styles.customStyle}`}>
        <Col md={10} lg={8}>
          <Card className="mb-3">
            <Card.Header as="h2" className={`text-center ${styles.textStyle1}`}>
              {renderHeader()}
            </Card.Header>
            <ListGroup variant="flush">
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <React.Fragment key={review._id}>
                    <ListGroup.Item className="review">
                      <Row className="mb-2">
                        <Col xs="auto" className="pr-2">
                          {review.userId.profilePic &&
                            review.userId.profilePic.data && (
                              <Image
                                src={`data:${
                                  review.userId.profilePic.contentType
                                };base64,${arrayBufferToBase64(
                                  review.userId.profilePic.data.data
                                )}`}
                                alt={`${review.userId.firstName}'s Profile`}
                                roundedCircle
                                className={styles.profileImage}
                              />
                            )}
                        </Col>
                        <Col>
                          <Row className="justify-content-between align-items-center">
                            <Col>
                              <div className="font-weight-bold">
                                {review.userId.firstName}{" "}
                                {review.userId.lastName}
                              </div>
                              <div className="text-muted">
                                Reviewed on:{" "}
                                {new Date(
                                  review.createdAt
                                ).toLocaleDateString()}
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
                          <div
                            className={`review-comment ${styles.textStyle2}`}
                          >
                            {review.comment}
                          </div>
                        </Col>
                      </Row>
                      {index !== reviews.length - 1 && <hr />}
                    </ListGroup.Item>
                  </React.Fragment>
                ))
              ) : (
                <p className={`text-center ${styles.textStyle2}`}>
                  No reviews yet.
                </p>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserReviews;