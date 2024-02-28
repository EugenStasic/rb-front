import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import ReviewForm from '../forms/ReviewForm';
import { checkIfReviewedService } from '../../services/review/reviewService';
import { Card, ListGroup, Button } from 'react-bootstrap';
import styles from "./BookingModal.module.css";

const BookingModal = ({
  show,
  onClose,
  booking,
  boat,
  onBookingCancel,
  isOwner,
  userId,
}) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);

  useEffect(() => {
    const fetchReviewStatus = async () => {
      try {
        const response = await checkIfReviewedService(boat._id);
        setHasReviewed(response.hasReviewed);
      } catch (error) {
        console.error("Error checking review status:", error);
      }
    };

    if (boat && userId) {
      fetchReviewStatus();
    }
  }, [boat, userId]);

  const renderContactInformation = () => {
    if (isOwner) {
      return (
        <>
          <ListGroup.Item>
            Renter Email: {booking.contactInfo.renter.email}
          </ListGroup.Item>
          <ListGroup.Item>
            Renter Phone: {booking.contactInfo.renter.phone}
          </ListGroup.Item>
        </>
      );
    } else {
      return (
        <>
          <ListGroup.Item>
            Owner Email: {booking.contactInfo.owner.email}
          </ListGroup.Item>
          <ListGroup.Item>
            Owner Phone: {booking.contactInfo.owner.phone}
          </ListGroup.Item>
        </>
      );
    }
  };

  const handleCancelClick = () => {
    onBookingCancel(booking._id);
  };

  const handleReviewClick = () => {
    setShowReviewForm(true);
  };

  const handleCloseReview = () => {
    setShowReviewForm(false);
    onClose();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (!show) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={styles.modal} onClick={onClose}>
      <div
        className={styles["modal-content"]}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles["modal-header"]}>
          <h4 className={`${styles["modal-title"]} ${styles.textStyle1}`}>
            Booking Details
          </h4>
        </div>
        <div className={styles["modal-body"]}>
          <Card>
            <Card.Header className={styles.textStyle1}>
              {boat.generalInformation.manufacturer}{" "}
              {boat.generalInformation.model}
            </Card.Header>
            <Card.Body>
              <Card.Title className={styles.textStyle1}>
                Booking Dates
              </Card.Title>
              <Card.Text className={styles.textStyle2}>
                {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
              </Card.Text>

              <Card.Title className={styles.textStyle1}>
                Price Details
              </Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item className={styles.textStyle2}>
                  Base Price: {booking.priceDetails.basePrice}€
                </ListGroup.Item>
                <ListGroup.Item className={styles.textStyle2}>
                  Extras Price: {booking.priceDetails.extrasPrice}€
                </ListGroup.Item>
                <ListGroup.Item className={styles.textStyle2}>
                  Total Price: {booking.priceDetails.totalPrice}€
                </ListGroup.Item>
              </ListGroup>

              <Card.Title className={styles.textStyle1}>
                Contact Information
              </Card.Title>
              <ListGroup variant="flush">
                {renderContactInformation()}
              </ListGroup>

              <Card.Title className={styles.textStyle1}>Extras</Card.Title>
              <ListGroup variant="flush">
                {booking.extras.map((extra, index) => (
                  <ListGroup.Item key={index} className={styles.textStyle2}>
                    {extra.option} - {extra.price}€
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <Card.Title className={styles.textStyle1}>
                Other Details
              </Card.Title>
              <Card.Text className={styles.textStyle2}>
                Cancellation Policy: {booking.cancellationPolicy}
              </Card.Text>
              <Card.Text className={styles.textStyle2}>
                Check-In Time: {booking.checkInTime}
              </Card.Text>
              <Card.Text className={styles.textStyle2}>
                Check-Out Time: {booking.checkOutTime}
              </Card.Text>
              <Card.Text className={styles.textStyle2}>
                Booking Status: {booking.currentStatus}
              </Card.Text>
            </Card.Body>
          </Card>
          {booking.currentStatus === "Completed" &&
            !isOwner &&
            !hasReviewed &&
            !showReviewForm && (
              <Button onClick={handleReviewClick}>Review</Button>
            )}
          {hasReviewed && booking.currentStatus === "Completed" && (
            <p>You have reviewed this boat</p>
          )}
          {showReviewForm && (
            <ReviewForm boatId={boat._id} onClose={handleCloseReview} />
          )}
          {booking.currentStatus === "Pending" && (
            <Button onClick={handleCancelClick}>Cancel Booking</Button>
          )}
        </div>
        <div className={styles["modal-footer"]}>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default BookingModal;