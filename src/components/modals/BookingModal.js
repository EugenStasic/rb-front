import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import ReviewForm from '../forms/ReviewForm';
import { checkIfReviewedService } from '../../services/review/reviewService';

const BookingModal = ({ show, onClose, booking, boat, onBookingCancel, isOwner, userId }) => {
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [hasReviewed, setHasReviewed] = useState(false);

    useEffect(() => {
        const fetchReviewStatus = async () => {
            try {
                const { hasReviewed } = await checkIfReviewedService(boat._id);
                setHasReviewed(hasReviewed);
            } catch (error) {
                console.error('Error checking review status:', error);
            }
        };

        if (boat && userId) {
            fetchReviewStatus();
        }
    }, [boat, userId]);


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

    if (!show) {
        return null;
    }

    return ReactDOM.createPortal(
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h4 className="modal-title">Booking Details</h4>
                </div>
                <div className="modal-body">
                    <p>{boat.generalInformation.manufacturer} {boat.generalInformation.model}</p>
                    {/* etc... */}
                    {booking.currentStatus === 'Completed' && !isOwner && !hasReviewed && !showReviewForm && (
                        <button onClick={handleReviewClick}>Review</button>
                    )}
                    {hasReviewed && booking.currentStatus === 'Completed' && (
                        <p>You have reviewed this boat</p>
                    )}
                    {showReviewForm && (
                        <ReviewForm boatId={boat._id} onClose={handleCloseReview} />
                    )}
                    {booking.currentStatus === 'Pending' && (
                        <button onClick={handleCancelClick}>Cancel Booking</button>
                    )}
                </div>
                <div className="modal-footer">
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>,
        document.getElementById('modal-root')
    );
};

export default BookingModal;