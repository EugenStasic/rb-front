import React, { useState } from 'react';
import { Nav, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { logout } from '../../actions/authActions';
import { useDispatch } from 'react-redux';

const ProfileSidebar = () => {
    const [activeKey, setActiveKey] = useState('userProfile');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const handleSelect = (selectedKey) => {
        setActiveKey(selectedKey);
        navigate(`/${selectedKey}`);
    };

    const sidebarStyle = {
        backgroundColor: '#ecf0f1',
        fontFamily: '"Source Sans Pro", sans-serif',
    };

    const linkStyle = {
        fontFamily: '"Source Sans Pro", sans-serif',
        color: '#34495e',
        fontWeight: 'bold'
        
    };

    return (
        <Col md={1} lg={1} className="sidebar" style={sidebarStyle}>
            <Nav variant="pills" className="flex-column" activeKey={activeKey} onSelect={handleSelect}>
                <Nav.Item><Nav.Link eventKey="userdash" style={linkStyle}>User Profile</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link eventKey="my-boats" style={linkStyle}>My Boats</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link eventKey="my-bookings" style={linkStyle}>My Bookings</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link eventKey="registerboat" style={linkStyle}>Register a Boat</Nav.Link></Nav.Item>
                <hr />
                <Nav.Item><Nav.Link onClick={handleLogout} style={linkStyle}>Logout</Nav.Link></Nav.Item>
            </Nav>
        </Col>
    );
};

export default ProfileSidebar;