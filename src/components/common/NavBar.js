import React, { useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/authActions';

function NavBar() {
    const isAuthenticated = useSelector(state => !!state.auth.token);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">Rent a Boat</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    {isAuthenticated ? (
                        <>
                            <LinkContainer to="/userwelcome">
                                <Nav.Link>Home</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/search">
                                <Nav.Link>SEARCH</Nav.Link>
                            </LinkContainer>
                            <NavDropdown title="Profile" id="basic-nav-dropdown">
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
                        </>
                    ) : (
                        <>
                            <LinkContainer to="/">
                                <Nav.Link>Home</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/register">
                                <Nav.Link>Register</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/login">
                                <Nav.Link>Login</Nav.Link>
                            </LinkContainer>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;