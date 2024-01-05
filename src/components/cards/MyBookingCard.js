import React, { useState } from 'react';
import BookingModal from '../modals/BookingModal';
import { useDispatch } from 'react-redux';
import { cancelBooking } from '../../actions/bookingActions';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const MyBookingCard = ({ booking, ownerInfo }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

    const handleCancelBooking = (bookingId) => {
        dispatch(cancelBooking(bookingId));
    };


    if (!booking || !booking.boatId) {
        return <div>Loading...</div>;
    }

    const imageSrc = `data:${booking.boatId.images[0].contentType};base64,${booking.boatId.images[0].data}`;

    const linkStyle = {
        fontFamily: '"Source Sans Pro", sans-serif',
        color: '#34495e',
        fontWeight: 'bold' 
    };

    const textStyle = {
        fontFamily: '"Source Sans Pro", sans-serif',
    };

    return (
        <Card className="my-booking-card mb-3">
            <Card.Body>
                <Row>
                    <Col xs={2} className="my-auto">
                        {imageSrc && (
                            <img 
                                src={imageSrc} 
                                alt={`${booking.boatId.generalInformation.manufacturer} ${booking.boatId.generalInformation.model}`} 
                                style={{ width: '100%' }} 
                            />
                        )}
                    </Col>
                    <Col xs={3} className="my-auto">
                        <Card.Title style={linkStyle}>{booking.boatId.generalInformation.manufacturer} {booking.boatId.generalInformation.model}</Card.Title>
                        <Card.Text style={textStyle}>Rented from: {ownerInfo.firstName} {ownerInfo.lastName}</Card.Text>
                    </Col>
                    <Col xs={2} className="my-auto">
                        <Card.Text >
                            <strong style={textStyle}>Start Date:</strong> {formatDate(booking.startDate)}
                            <br/>
                            <strong style={textStyle}>End Date:</strong> {formatDate(booking.endDate)}
                        </Card.Text>
                    </Col>
                    <Col xs={2} className="my-auto">
                        <Card.Text><strong style={textStyle}>Total Price:</strong> {booking.priceDetails.totalPrice}.00€</Card.Text>
                    </Col>
                    <Col xs={2} className="my-auto">
                        <Card.Text><strong style={textStyle}>Status:</strong> {booking.currentStatus}</Card.Text>
                    </Col>
                    <Col xs={1} className="my-auto">
                        <Button variant="primary" onClick={() => setIsModalOpen(true)} style={textStyle}>Show Details</Button>
                    </Col>
                </Row>
            </Card.Body>
            <BookingModal
                show={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                booking={booking}
                boat={booking.boatId}
                onBookingCancel={handleCancelBooking}
                userId={booking.renterId}
                isOwner={false}
            />
        </Card>
    );
};

export default MyBookingCard;