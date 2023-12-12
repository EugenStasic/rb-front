import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBoatListing } from '../../../actions/boatActions';
import MyBoatCard from '../../../components/cards/MyBoatCard';
import { useNavigate } from 'react-router';

const MyBoats = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { boats, loading } = useSelector(state => state.boat);

    if (loading) return <div>Loading...</div>;

    const handleEdit = (boatId) => {
        navigate(`/edit-boat/${boatId}`);
    };

    const handleDelete = (boatId) => {
        dispatch(deleteBoatListing(boatId));
    };

    return (
        <div>
            <h1>My Boats</h1>
            <button onClick={() => navigate('/my-boats')}>My Boats</button>
            <button onClick={() => navigate('/my-boat-bookings')}>My Boat Bookings</button>
            {boats.map(boat => (
                <MyBoatCard
                    key={boat._id}
                    boat={boat}
                    onEdit={() => handleEdit(boat._id)}
                    onDelete={() => handleDelete(boat._id)}
                    imageUrl={`http://localhost:5000/boat/${boat._id}/images/0`}
                />
            ))}
        </div>
    );
};

export default MyBoats;