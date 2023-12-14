import React from 'react';

const UserReviews = ({ reviews }) => {
    const bufferToBase64 = (buffer) => {
        const binary = buffer.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
        return window.btoa(binary);
    };

    return (
        <div>
            <h2>User Reviews</h2>
            {reviews.length > 0 ? (
                reviews.map(review => (
                    <div key={review._id} className="review">
                        <div className="review-user-info">
                            {review.userId.profilePic && review.userId.profilePic.data && (
                                <img 
                                    src={`data:${review.userId.profilePic.contentType};base64,${bufferToBase64(review.userId.profilePic.data.data)}`} 
                                    alt={`${review.userId.firstName}'s Profile`} 
                                    className="review-user-pic" 
                                />
                            )}
                            <div className="review-user-name">
                                {review.userId.firstName} {review.userId.lastName}
                            </div>
                        </div>
                        <div className="review-content">
                            <div className="review-rating">Rating: {review.rating}</div>
                            <div className="review-comment">{review.comment}</div>
                            <div className="review-date">
                                Reviewed on: {new Date(review.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No reviews yet.</p>
            )}
        </div>
    );
};

export default UserReviews;