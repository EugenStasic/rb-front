import React from 'react';
import { useNavigate } from 'react-router-dom';
import defaultImage from '../../assets/images/MissingImage.PNG';

const BoatCard = ({ boat, imageUrl }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/boatad/${boat._id}`);
    };

    return (
        <div className="boat-card" onClick={handleNavigate}>
            <h2>{boat.generalInformation.manufacture} {boat.generalInformation.model}</h2>
            <img src={imageUrl || defaultImage} alt={`${boat.generalInformation.manufacturer} ${boat.generalInformation.model}`} style={{ width: '120px', height: 'auto' }} /> 
            <h3>{boat.technicalInformation.enginePower} HP</h3>
        </div>
    );
};

export default BoatCard;