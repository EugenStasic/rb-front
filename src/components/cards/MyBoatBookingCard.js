import React, { useState } from 'react';
import BookingModal from '../modals/BookingModal';
import { useDispatch } from 'react-redux';
import { cancelBooking } from '../../actions/bookingActions';

const MyBoatBookingCard = ({ booking, boat }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

    const handleBookingCancel = (bookingId) => {
        dispatch(cancelBooking(bookingId));
    };

    if (!booking || !boat) {
        return <div>Loading...</div>;
    }

    return (
        <div className="booking-card">
            <h3>{boat.generalInformation.manufacturer} {boat.generalInformation.model}</h3>
            <p>Rented to: {booking.contactInfo.renter.email}</p>
            <p>Dates: {formatDate(booking.startDate)} to {formatDate(booking.endDate)}</p>
            <p>Total Price: {booking.totalPrice}.00€</p>
            <p>Status: {booking.currentStatus}</p>

            <button onClick={() => setIsModalOpen(true)}>Show Details</button>

            <BookingModal 
                show={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                booking={booking} 
                boat={boat} 
                onBookingCancel={handleBookingCancel} 
                isOwner={true}
            />
        </div>
    );
};

export default MyBoatBookingCard;