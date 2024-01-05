import React from 'react';
import { useSelector } from 'react-redux';

const DisplayMessage = () => {
    const error = useSelector(state => state.auth.error || state.user.error || state.boat.error);
    const successMessage = useSelector(state => state.auth.successMessage || state.user.successMessage || state.boat.successMessage);

    if (!error && !successMessage) return null;
    
    return (
        <>
            {error && <div className='error'>{error.message || 'An error occurred'}</div>}
            {successMessage && <div className='successMessage'>{successMessage}</div>}
        </>
    )
};

export default DisplayMessage;