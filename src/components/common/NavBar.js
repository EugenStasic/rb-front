import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar, NavDropdown, Image } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../actions/authActions';
import stockPic from '../../assets/images/StockPic.PNG'; 
import logoPic from '../../assets/images/Logo3.PNG';
import { getUserInfo } from '../../actions/userActions';
import './Common.css';

function NavBar() {
    const isAuthenticated = useSelector(state => !!state.auth.token);
    const { userInfo } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [profilePicUrl, setProfilePicUrl] = useState(stockPic);

    useEffect(() => {
        setProfilePicUrl(stockPic);
        if (isAuthenticated) {
            dispatch(getUserInfo());
        }
    }, [isAuthenticated, dispatch]);

    useEffect(() => {
        if (userInfo.profilePic && userInfo.profilePic.data) {
            const base64Image = `data:image/jpeg;base64,${userInfo.profilePic.data}`;
            setProfilePicUrl(base64Image);
        }
    }, [userInfo.profilePic]);

    const handleLogout = () => {
        dispatch(logout());
        setProfilePicUrl(stockPic);
        navigate('/');
    };

    return (
        <Navbar className='custom' expand="lg">
            <LinkContainer to={isAuthenticated ? "/userwelcome" : "/"}>
            <Navbar.Brand >
                    <Image src={logoPic} height="60" style={{ marginLeft: '10px', borderRadius: '2px' }} alt="Rent a Boat Logo" />
                </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    {isAuthenticated ? (
                        <>
                            <LinkContainer to="/search">
                                <Nav.Link>Find a Boat</Nav.Link>
                            </LinkContainer>
                        </>
                    ) : (
                        <>
                            <LinkContainer to="/register">
                                <Nav.Link>Register</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/login">
                                <Nav.Link>Login</Nav.Link>
                            </LinkContainer>
                        </>
                    )}
                </Nav>
                {isAuthenticated && (
                    <Nav className="nav-dropdown-margin">
                        <NavDropdown 
                            title={
                                <>
                                    <Image src={profilePicUrl} width="30" height="30" roundedCircle />
                                    {` ${userInfo?.firstName || 'Profile'}`}
                                </>
                            } 
                            id="basic-nav-dropdown"
                            align="end"
                        >
                            <LinkContainer to="/userdash">
                                <NavDropdown.Item>User Dashboard</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/my-boats">
                                <NavDropdown.Item>My Boats</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/my-bookings">
                                <NavDropdown.Item>My Bookings</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/registerboat">
                                <NavDropdown.Item>Register a Boat</NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;