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
        <form onSubmit={handleSubmit} className="container mt-4">
            <h2 className="mb-3">Edit Boat Images</h2>
            <div className="mb-3">
                <input type="file" className="form-control" multiple onChange={handleNewImageChange} />
                <button type="submit" className="btn btn-primary mt-2">Upload Images</button>
            </div>
            <div>
                <h3 className="mb-2">Existing Images</h3>
                {existingImages.map((image, index) => (
                    <div key={index} className="mb-2">
                        <img 
                            src={`http://localhost:5000/boat/${currentBoat._id}/images/${index}`} 
                            alt={`Boat Image ${index}`} 
                            className="img-thumbnail"
                            style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
                        />
                        <button 
                            type="button" 
                            className="btn btn-danger ms-2"
                            onClick={() => handleDeleteImage(index)}
                        >
                            Delete Image
                        </button>
                    </div>
                ))}
            </div>
        </form>
    );
};

export default BoatImagesForm;