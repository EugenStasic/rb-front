import React, { useState } from 'react';
import BookingModal from '../modals/BookingModal';
import { useDispatch } from 'react-redux';
import { cancelBooking } from '../../actions/bookingActions';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from "./MyBoatBookingCard.module.css";

const MyBoatBookingCard = ({ booking, renterInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

  const handleBookingCancel = (bookingId) => {
    dispatch(cancelBooking(bookingId));
  };

  if (!booking || !booking.boatId) {
    return <div>Loading...</div>;
  }

  const imageSrc = booking.boatId.images[0]
    ? `data:${booking.boatId.images[0].contentType};base64,${booking.boatId.images[0].data}`
    : "path";

  return (
    <Card className={`${styles["my-booking-card"]} mb-3`}>
      <Card.Body>
        <Row>
          <Col xs={2} className="my-auto">
            {imageSrc && (
              <img
                src={imageSrc}
                alt={`${booking.boatId.generalInformation.manufacturer} ${booking.boatId.generalInformation.model}`}
                style={{ width: "100%" }}
              />
            )}
          </Col>
          <Col xs={3} className="my-auto">
            <Card.Title className={styles["bold"]}>
              {booking.boatId.generalInformation.manufacturer}{" "}
              {booking.boatId.generalInformation.model}
            </Card.Title>
            <Card.Text className={styles["base"]}>
              Rented to: {renterInfo.firstName} {renterInfo.lastName}
            </Card.Text>
          </Col>
          <Col xs={2} className="my-auto">
            <Card.Text>
              <strong className={styles["bold"]}>Start Date:</strong>{" "}
              {formatDate(booking.startDate)}
              <br />
              <strong className={styles["bold"]}>End Date:</strong>{" "}
              {formatDate(booking.endDate)}
            </Card.Text>
          </Col>
          <Col xs={2} className="my-auto">
            <Card.Text>
              <strong className={styles["bold"]}>Total Price:</strong>{" "}
              {booking.priceDetails.totalPrice}.00€
            </Card.Text>
          </Col>
          <Col xs={2} className="my-auto">
            <Card.Text>
              <strong className={styles["bold"]}>Status:</strong>{" "}
              {booking.currentStatus}
            </Card.Text>
          </Col>
          <Col xs={1} className="my-auto">
            <Button
              variant="primary"
              onClick={() => setIsModalOpen(true)}
              className={styles["base"]}
            >
              Show Details
            </Button>
          </Col>
        </Row>
      </Card.Body>
      <BookingModal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        booking={booking}
        boat={booking.boatId}
        onBookingCancel={handleBookingCancel}
        isOwner={true}
      />
    </Card>
  );
};

export default MyBoatBookingCard;