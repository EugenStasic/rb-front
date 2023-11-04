import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchUserDetails } from '../../services/users/userService';

function UserWelcome() {
    const [firstName, setfirstName] = useState('');
    const [loading, setLoading] = useState(true);
    const userId = useSelector(state => state.auth.userId);

    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const userDetails = await fetchUserDetails(userId);
                setfirstName(userDetails.firstName);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user details:", error);
                setLoading(false);
            }
        };
        if(userId) {
            getUserDetails();
        }

    }, [userId]);

    if (loading) {
        return <div>Logging in...</div>
    }

    return(
        <div>
            <h1>Welcome to rent a boat, {firstName}</h1>
        </div>
    )
}


export default UserWelcome;