import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { logout } from '../../actions/authActions';

function NavBar() {
    const isAuthenticated = useSelector(state => !!state.auth.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <div className="navBar">
            <Link to={isAuthenticated ? '/userwelcome' : '/'}>
                <button>Home</button>
            </Link>
            {isAuthenticated && (
                <Link to='/userdash'>
                    <button>Dashboard</button>
                </Link>
            )}
            {!isAuthenticated && (
                <>
                    <Link to='/register'>
                        <button>Register</button>
                    </Link>
                    <Link to='/login'>
                        <button>Login</button>
                    </Link>
                </>
            )}
            {isAuthenticated && (
                <button onClick={handleLogout}>Logout</button>
            )}
        </div>
    );
}

export default NavBar;