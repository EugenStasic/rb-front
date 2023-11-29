import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteBoatImages, getBoatInfo } from '../../../actions/boatActions';
import { useParams } from 'react-router';

const BoatImagesForm = ({ existingImages, onSubmit }) => {
    const { boatId } = useParams();
    const dispatch = useDispatch();
    const [newImages, setNewImages] = useState([]);
    const currentBoat = useSelector(state => state.boat.currentBoat);

    const handleNewImageChange = (e) => {
        setNewImages([...e.target.files]);
    };

    const handleDeleteImage = async (index) => {
            await dispatch(deleteBoatImages(currentBoat._id, index));
            
            dispatch(getBoatInfo(boatId));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSubmit(newImages, []);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Boat Images</h2>
            <div>
                <input type="file" multiple onChange={handleNewImageChange} />
                <button type="submit">Upload Images</button>
            </div>
            <div>
                <h3>Existing Images</h3>
                {existingImages.map((image, index) => (
                    <div key={index}>
                        <img src={`http://localhost:5000/boat/${currentBoat._id}/images/${index}`} alt={`Boat Image ${index}`} style={{ width: '100px', height: '100px' }} />
                        <button type="button" onClick={() => handleDeleteImage(index)}>Delete Image</button>
                    </div>
                ))}
            </div>
        </form>
    );
};

export default BoatImagesForm;