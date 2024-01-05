import React, { useState, useEffect } from 'react';
import { fetchUserDetails } from '../../services/users/userService';
import './Welcome.css';

function UserWelcome() {
    const [firstName, setFirstName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const userDetails = await fetchUserDetails();
                setFirstName(userDetails.firstName);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user details:", error);
                setLoading(false);
            }
        };

        getUserDetails();
    }, []);

    if (loading) {
        return <div className="text-center mt-5">Logging in...</div>
    }

    return (
        <div className="welcome-background">
            <div className="welcome-container">
                <div className="welcome-text-overlay">
                    <h1 className="welcome-display-4">Welcome back, {firstName}!</h1>
                    <p className="welcome-lead">Ready for your next adventure?</p>
                    <hr className="welcome-hr" />
                    <div className="my-4">
                        <a href="/search" className="welcome-btn-primary mr-2">Find a Boat</a>
                        <a href="/my-bookings" className="welcome-btn-secondary">My Bookings</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserWelcome;