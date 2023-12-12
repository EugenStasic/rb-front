import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserBookings } from '../../actions/bookingActions';
import MyBookingCard from '../../components/cards/MyBookingCard';

const MyBookings = () => {
    const dispatch = useDispatch();
    const { userRentals, loading, error } = useSelector(state => state.booking);

    useEffect(() => {
        dispatch(fetchUserBookings());
    }, [dispatch]);

    if (loading) {
        return <p>Loading bookings...</p>;
    }

    if (error) {
        return <p>Error loading bookings: {error}</p>;
    }

    return (
        <div>
            <h1>My Bookings</h1>
            {userRentals.length > 0 ? (
                userRentals.map(booking => (
                    <MyBookingCard key={booking._id}
                    booking={booking}
                    boat={booking.boatId}
                    userId={booking.renterId}
                    />
                ))
            ) : (
                <p>No bookings found.</p>
            )}
        </div>
    );
};

export default MyBookings;