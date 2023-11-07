import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBoatListing, getUserBoatsInfo } from '../../../actions/boatActions';
import MyBoatCard from '../../../components/cards/MyBoatCard';
import { useNavigate } from 'react-router';

const MyBoats = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const boats = useSelector(state => state.boat.boats);
    const loading = useSelector(state => state.boat.loading);
    const error = useSelector(state => state.boat.error);

    useEffect(() => {
        dispatch(getUserBoatsInfo());
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const handleEdit = (boatId) => {
        navigate(`/edit-boat/${boatId}`)
    };

    const handleDelete = (boatId) => {
        dispatch(deleteBoatListing(boatId));
    };

    return (
        <div>
            <h1>My Boats</h1>
            {boats.map(boat =>
                 <MyBoatCard
                    key={boat._id}
                    boat={boat}
                    onEdit={() => handleEdit(boat._id)}
                    onDelete={() => handleDelete(boat._id)}
                />)}
        </div>
    );
};

export default MyBoats;