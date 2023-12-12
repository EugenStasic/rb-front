import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyBoatBookingCard from '../../../components/cards/MyBoatBookingCard';
import { fetchUserBoatsBookings } from '../../../actions/bookingActions';

const MyBoatsBookingPage = () => {
    const dispatch = useDispatch();
    const { userBoatsBookings, loading, error } = useSelector(state => state.booking);

    useEffect(() => {
        dispatch(fetchUserBoatsBookings());
    }, [dispatch]);

    if (loading) {
        return <p>Loading bookings...</p>;
    }

    if (error) {
        return <p>Error loading bookings: {error}</p>;
    }

    return (
        <div>
            <h1>Bookings for My Boats</h1>
            {userBoatsBookings.length > 0 ? (
                userBoatsBookings.map(booking => (
                    <MyBoatBookingCard key={booking._id} booking={booking} boat={booking.boatId} />
                ))
            ) : (
                <p>No bookings found for your boats.</p>
            )}
        </div>
    );
};

export default MyBoatsBookingPage;