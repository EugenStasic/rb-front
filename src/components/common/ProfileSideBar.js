import React, { useState } from 'react';
import { Nav, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { logout } from '../../actions/authActions';
import { useDispatch } from 'react-redux';
import styles from "./ProfileSideBar.module.css";

const ProfileSidebar = () => {
  const [activeKey, setActiveKey] = useState("userProfile");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleSelect = (selectedKey) => {
    setActiveKey(selectedKey);
    navigate(`/${selectedKey}`);
  };

  return (
    <Col md={1} lg={1} className={styles.sidebar}>
      <Nav
        variant="pills"
        className="flex-column"
        activeKey={activeKey}
        onSelect={handleSelect}
      >
        <Nav.Item>
          <Nav.Link eventKey="userdash" className={styles.textStyle}>
            User Profile
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="my-boats" className={styles.textStyle}>
            My Boats
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="my-bookings" className={styles.textStyle}>
            My Bookings
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="registerboat" className={styles.textStyle}>
            Register a Boat
          </Nav.Link>
        </Nav.Item>
        <hr />
        <Nav.Item>
          <Nav.Link onClick={handleLogout} className={styles.textStyle}>
            Logout
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Col>
  );
};

export default ProfileSidebar;