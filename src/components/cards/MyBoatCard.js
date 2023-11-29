import React from 'react';
import { useNavigate } from 'react-router-dom';

const MyBoatCard = ({ boat, onEdit, onDelete, imageUrl }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/boatad/${boat._id}`);
    };

    return (
        <div className="boat-card" onClick={handleNavigate}>
            <h2>{boat.generalInformation.manufacture} {boat.generalInformation.model}</h2>
            <img src={imageUrl} alt={`${boat.generalInformation.manufacturer} ${boat.generalInformation.model}`} style={{ width: '120px', height: 'auto' }} /> 
            <h3>{boat.technicalInformation.enginePower} HP</h3>
            <button type="button" onClick={(e) => {
                e.stopPropagation();
                onEdit(boat._id);
            }}>Edit</button>
            <button type="button" onClick={(e) => {
                e.stopPropagation();
                onDelete(boat._id);
            }}>Delete</button>
        </div>
    );
};

export default MyBoatCard;