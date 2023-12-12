import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { submitReview } from '../../actions/reviewActions';

const ReviewForm = ({ boatId, onClose }) => {
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(submitReview(boatId, rating, comment));
        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Rating: </label>
                <select value={rating} onChange={(e) => setRating(parseInt(e.target.value, 10))}>
                    {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Comment: </label>
                <textarea 
                    value={comment} 
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Enter your review..."
                />
            </div>
            <button type="submit">Submit Review</button>
        </form>
    );
};

export default ReviewForm;