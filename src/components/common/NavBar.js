import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { logout } from '../../actions/authActions';

function NavBar() {
    const isAuthenticated = useSelector(state => !!state.auth.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <div className="navBar">
            {isAuthenticated ? (
                <div 
                    onMouseEnter={() => setShowDropdown(true)}
                    onMouseLeave={() => setShowDropdown(false)}
                >
                    <Link to="/userwelcome">
                    <button>Home</button>
                    </Link>
                    <button>Profile</button>
                    {showDropdown && (
                        <div className="dropdown-menu">
                            <Link to='/userdash'>User Dashboard</Link>
                            <Link to='/my-boats'>My Boats</Link>
                            <Link to='/registerboat'>Register a Boat</Link>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </div>
            ) : (
                <>
                    <Link to="/">
                    <button>Home</button>
                    </Link>
                    <Link to='/register'>
                        <button>Register</button>
                    </Link>
                    <Link to='/login'>
                        <button>Login</button>
                    </Link>
                </>
            )}
        </div>
    );
}

export default NavBar;