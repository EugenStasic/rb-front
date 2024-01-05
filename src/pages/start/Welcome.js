import React from 'react';
import './Welcome.css';

function Welcome() {
    return (
        <div className="welcome-background">
            <div className="welcome-container">
                <div className="welcome-text-overlay">
                    <h1 className="welcome-display-4">Welcome To Rent a Boat!</h1>
                    <p className="welcome-lead">Discover the best boats near you.</p>
                    <hr className="welcome-hr" />
                    <p>Join us and start your adventure on the water today!</p>
                    <div>
                        <a className="welcome-btn-primary btn-lg" href="/register" role="button">Sign Up Now</a>
                        <a className="welcome-btn-secondary btn-lg" href="/search" role="button">Check Out Boat Selection</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Welcome;