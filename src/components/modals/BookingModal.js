import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import ReviewForm from '../forms/ReviewForm';
import { checkIfReviewedService } from '../../services/review/reviewService';
import { Card, ListGroup, Button } from 'react-bootstrap';
import './BookingModal.css';

const BookingModal = ({ show, onClose, booking, boat, onBookingCancel, isOwner, userId }) => {
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [hasReviewed, setHasReviewed] = useState(false);

    useEffect(() => {
        const fetchReviewStatus = async () => {
            try {
                const response = await checkIfReviewedService(boat._id);
                setHasReviewed(response.hasReviewed);
            } catch (error) {
                console.error('Error checking review status:', error);
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
                    <ListGroup.Item>Renter Email: {booking.contactInfo.renter.email}</ListGroup.Item>
                    <ListGroup.Item>Renter Phone: {booking.contactInfo.renter.phone}</ListGroup.Item>
                </>
            );
        } else {
            return (
                <>
                    <ListGroup.Item>Owner Email: {booking.contactInfo.owner.email}</ListGroup.Item>
                    <ListGroup.Item>Owner Phone: {booking.contactInfo.owner.phone}</ListGroup.Item>
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

    const linkStyle = {
        fontFamily: '"Source Sans Pro", sans-serif',
        color: '#34495e',
        fontWeight: 'bold' 
    };
  
    const textStyle = {
      fontFamily: '"Source Sans Pro", sans-serif',
  };

    return ReactDOM.createPortal(
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h4 className="modal-title" style={linkStyle}>Booking Details</h4>
                </div>
                <div className="modal-body">
                    <Card>
                        <Card.Header style={linkStyle}>{boat.generalInformation.manufacturer} {boat.generalInformation.model}</Card.Header>
                        <Card.Body>
                            <Card.Title style={linkStyle}>Booking Dates</Card.Title>
                            <Card.Text style={textStyle}>{formatDate(booking.startDate)} - {formatDate(booking.endDate)}</Card.Text>

                            <Card.Title style={linkStyle}>Price Details</Card.Title>
                            <ListGroup variant="flush">
                                <ListGroup.Item style={textStyle}>Base Price: {booking.priceDetails.basePrice}€</ListGroup.Item>
                                <ListGroup.Item style={textStyle}>Extras Price: {booking.priceDetails.extrasPrice}€</ListGroup.Item>
                                <ListGroup.Item style={textStyle}>Total Price: {booking.priceDetails.totalPrice}€</ListGroup.Item>
                            </ListGroup>

                            <Card.Title style={linkStyle}>Contact Information</Card.Title>
                                <ListGroup variant="flush" style={textStyle}>
                                    {renderContactInformation()}
                                </ListGroup>

                            <Card.Title style={linkStyle}>Extras</Card.Title>
                            <ListGroup variant="flush" style={textStyle}>
                                {booking.extras.map((extra, index) => (
                                    <ListGroup.Item key={index}>{extra.option} - {extra.price}€</ListGroup.Item>
                                ))}
                            </ListGroup>

                            <Card.Title style={linkStyle}>Other Details</Card.Title>
                            <Card.Text style={textStyle}>Cancellation Policy: {booking.cancellationPolicy}</Card.Text>
                            <Card.Text style={textStyle}>Check-In Time: {booking.checkInTime}</Card.Text>
                            <Card.Text style={textStyle}>Check-Out Time: {booking.checkOutTime}</Card.Text>
                            <Card.Text style={textStyle}>Booking Status: {booking.currentStatus}</Card.Text>
                        </Card.Body>
                    </Card>
                    {booking.currentStatus === 'Completed' && !isOwner && !hasReviewed && !showReviewForm && (
                        <Button onClick={handleReviewClick}>Review</Button>
                    )}
                    {hasReviewed && booking.currentStatus === 'Completed' && (
                        <p>You have reviewed this boat</p>
                    )}
                    {showReviewForm && (
                        <ReviewForm boatId={boat._id} onClose={handleCloseReview} />
                    )}
                    {booking.currentStatus === 'Pending' && (
                        <Button onClick={handleCancelClick}>Cancel Booking</Button>
                    )}
                </div>
                <div className="modal-footer">
                    <Button variant="secondary" onClick={onClose}>Close</Button>
                </div>
            </div>
        </div>,
        document.getElementById('modal-root')
    );
};

export default BookingModal;