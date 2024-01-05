import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserBookings } from '../../actions/bookingActions';
import MyBookingCard from '../../components/cards/MyBookingCard';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { getPublicUserInfo } from '../../actions/userActions';
import '../Sidebar.css';

const MyBookings = () => {
    const dispatch = useDispatch();
    const { userRentals, loading, error } = useSelector(state => state.booking);
    const { publicProfiles } = useSelector(state => state.user);
    const [activeKey, setActiveKey] = useState('ongoing');

    useEffect(() => {
        dispatch(fetchUserBookings());
    }, [dispatch]);

    useEffect(() => {
        userRentals.forEach(booking => {
            if (!publicProfiles[booking.renterId]) {
                dispatch(getPublicUserInfo(booking.renterId));
            }
            const ownerId = booking.boatId.ownerId; 
            if (!publicProfiles[ownerId]) {
                dispatch(getPublicUserInfo(ownerId));
            }
        });
    }, [userRentals, publicProfiles, dispatch]);

    const categorizedBookings = userRentals.reduce((acc, booking) => {
        const key = booking.currentStatus.toLowerCase();
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(booking);
        return acc;
    }, {});

    const renderBookingSection = (key) => {
        return categorizedBookings[key] ? categorizedBookings[key].map(booking => (
            <MyBookingCard 
                key={booking._id} 
                booking={booking} 
                boat={booking.boatId}
                renterInfo={publicProfiles[booking.renterId] || {}}
                ownerInfo={publicProfiles[booking.boatId.ownerId] || {}} 
            />
        )) : <p>No bookings found.</p>;
    };

    if (loading) {
        return <p>Loading bookings...</p>;
    }

    if (error) {
        return <p>Error loading bookings: {error}</p>;
    }

    const sidebarStyle = {
        paddingTop: '2vh',
        paddingBottom: 'vh',
        backgroundColor: '#ecf0f1',
        fontWeight: 'bold',
        fontFamily: '"Source Sans Pro", sans-serif'
    };

    const linkStyle = {
        fontFamily: '"Source Sans Pro", sans-serif',
        color: '#34495e',
        fontWeight: 'bold' 
    };

    return (
        <Container fluid>
            <Row>
                <Col md={1} lg={1} className="sidebar" style={sidebarStyle}>
                    <h3 style={linkStyle}>Booking Status</h3>
                    <Nav variant="pills" className="flex-column" activeKey={activeKey} onSelect={(selectedKey) => setActiveKey(selectedKey)}>
                        <Nav.Item><Nav.Link eventKey="pending" style={linkStyle}>Pending</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link eventKey="ongoing" style={linkStyle}>Ongoing</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link eventKey="completed" style={linkStyle}>Completed</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link eventKey="cancelled" style={linkStyle}>Cancelled</Nav.Link></Nav.Item>
                    </Nav>
                </Col>
                <Col md={9} lg={10} className="content-area" style={{ paddingLeft: '12vh'}}>
                    <h1 style={linkStyle}>My Bookings</h1>
                    <div className="booking-section">
                        {renderBookingSection(activeKey)}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default MyBookings;