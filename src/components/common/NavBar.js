import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar, NavDropdown, Image } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../actions/authActions';
import stockPic from '../../assets/images/StockPic.PNG'; 
import logoPic from '../../assets/images/Logo3.PNG';
import { getUserInfo } from '../../actions/userActions';
import styles from "./NavBar.module.css";

function NavBar() {
  const isAuthenticated = useSelector((state) => !!state.auth.token);
  const { userInfo } = useSelector((state) => state.user);
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
    navigate("/");
  };

  return (
    <Navbar className={styles.custom} expand="lg">
      <LinkContainer
        to={isAuthenticated ? "/userwelcome" : "/"}
        activeClassName={styles.active}
      >
        <Navbar.Brand className={styles["navbar-brand"]}>
          <Image
            src={logoPic}
            height="60"
            style={{ marginLeft: "10px", borderRadius: "2px" }}
            alt="Rent a Boat Logo"
          />
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className={`me-auto ${styles["navbar-nav"]}`}>
          {isAuthenticated ? (
            <>
              <LinkContainer to="/search" activeClassName={styles.active}>
                <Nav.Link className={styles["nav-link"]}>Find a Boat</Nav.Link>
              </LinkContainer>
            </>
          ) : (
            <>
              <LinkContainer to="/register" activeClassName={styles.active}>
                <Nav.Link className={styles["nav-link"]}>Register</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login" activeClassName={styles.active}>
                <Nav.Link className={styles["nav-link"]}>Login</Nav.Link>
              </LinkContainer>
            </>
          )}
        </Nav>
        {isAuthenticated && (
          <Nav className={styles["nav-dropdown"]}>
            <NavDropdown
              title={
                <>
                  <Image
                    src={profilePicUrl}
                    width="30"
                    height="30"
                    roundedCircle
                  />
                  {` ${userInfo?.firstName || "Profile"}`}
                </>
              }
              id="basic-nav-dropdown"
              align="end"
              className={styles["nav-dropdown-title"]}
            >
              <LinkContainer to="/userdash" activeClassName={styles.active}>
                <NavDropdown.Item className={styles["nav-dropdown-item"]}>
                  User Dashboard
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/my-boats" activeClassName={styles.active}>
                <NavDropdown.Item className={styles["nav-dropdown-item"]}>
                  My Boats
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/my-bookings" activeClassName={styles.active}>
                <NavDropdown.Item className={styles["nav-dropdown-item"]}>
                  My Bookings
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/registerboat" activeClassName={styles.active}>
                <NavDropdown.Item className={styles["nav-dropdown-item"]}>
                  Register a Boat
                </NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={handleLogout}
                className={styles["nav-dropdown-item"]}
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;