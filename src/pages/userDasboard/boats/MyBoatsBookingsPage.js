import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyBoatBookingCard from '../../../components/cards/MyBoatBookingCard';
import { fetchUserBoatsBookings } from '../../../actions/bookingActions';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { getPublicUserInfo } from '../../../actions/userActions';
import { useNavigate } from 'react-router';
import '../../Sidebar.css';

const MyBoatsBookingPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userBoatsBookings, loading, error } = useSelector(state => state.booking);
    const { publicProfiles } = useSelector(state => state.user);
    const [activeKey, setActiveKey] = useState('ongoing');

    useEffect(() => {
        dispatch(fetchUserBoatsBookings());
    }, [dispatch]);

    useEffect(() => {
        userBoatsBookings.forEach(booking => {
            if (!publicProfiles[booking.renterId]) {
                dispatch(getPublicUserInfo(booking.renterId));
            }
        });
    }, [userBoatsBookings, publicProfiles, dispatch]);

    const categorizedBookings = userBoatsBookings.reduce((acc, booking) => {
        const key = booking.currentStatus.toLowerCase();
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(booking);
        return acc;
    }, {});

    const renderBookingSection = (key) => {
        return categorizedBookings[key] ? categorizedBookings[key].map(booking => (
            <MyBoatBookingCard 
                key={booking._id} 
                booking={booking}
                renterInfo={publicProfiles[booking.renterId] || {}}
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
        backgroundColor: '#ecf0f1',
        fontFamily: '"Source Sans Pro", sans-serif',
        color: '#34495e',
        fontWeight: 'bold' 
    };

    const textStyle = {
      fontFamily: '"Source Sans Pro", sans-serif',
      color: "#34495e",
      fontWeight: "bold",
    };

    return (
      <Container fluid>
        <Row>
          <Col md={1} lg={1} className="sidebar" style={sidebarStyle}>
            <div className="d-flex mb-3">
              <button
                className="btn btn-primary me-2"
                onClick={() => navigate("/my-boats")}
              >
                Back to My Boats
              </button>
            </div>
            <Nav
              variant="pills"
              className="flex-column"
              activeKey={activeKey}
              onSelect={(selectedKey) => setActiveKey(selectedKey)}
            >
              <Nav.Item>
                <Nav.Link eventKey="pending" style={textStyle}>
                  Pending
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="ongoing" style={textStyle}>
                  Ongoing
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="completed" style={textStyle}>
                  Completed
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="cancelled" style={textStyle}>
                  Cancelled
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col
            md={9}
            lg={10}
            className="content-area"
            style={{ paddingLeft: "12vh" }}
          >
            <h1 style={textStyle}>Bookings for My Boats</h1>
            <div className="booking-section">
              {renderBookingSection(activeKey)}
            </div>
          </Col>
        </Row>
      </Container>
    );
};

export default MyBoatsBookingPage;