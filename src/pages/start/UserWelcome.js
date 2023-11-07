import React, { useState, useEffect } from 'react';
import { fetchUserDetails } from '../../services/users/userService';

function UserWelcome() {
    const [firstName, setfirstName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const userDetails = await fetchUserDetails();
                setfirstName(userDetails.firstName);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user details:", error);
                setLoading(false);
            }
        };

            getUserDetails();
    }, []);

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