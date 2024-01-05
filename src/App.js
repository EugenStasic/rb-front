import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';

import store from './store';
import NavBar from './components/common/NavBar';
import Welcome from './pages/start/Welcome';
import UserWelcome from './pages/start/UserWelcome';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import UserDash from './pages/userDasboard/userDash';
import BoatRegister from './pages/userDasboard/boats/BoatRegister';
import EditBoat from './pages/userDasboard/boats/EditBoat';
import MyBoats from './pages/userDasboard/boats/MyBoats';
import BoatAd from './pages/userDasboard/boats/BoatAd';
import { clearMessages } from './actions/globalActions';
import { getUserBoatsInfo } from './actions/boatActions';
import { getUserInfo } from './actions/userActions';
import DisplayMessage from './utils/DisplayMessage';
import SearchPage from './pages/browsing/SearchPage';
import MyBookings from './pages/userDasboard/MyBookingsPage';
import MyBoatsBookingPage from './pages/userDasboard/boats/MyBoatsBookingsPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/common/Footer';

const RouteChangesWatcher = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/userdash") {
      dispatch(getUserInfo());
    };
    if (location.pathname === "/my-boats") {
      dispatch(getUserBoatsInfo());
    };

    dispatch(clearMessages());
  }, [location, dispatch]);

  return null;
};

function App() {
  const FooterWithRouter = () => {
    const location = useLocation();
    const showFooter = ['/', '/userwelcome', '/userdash', '/login', '/register'].includes(location.pathname);

    return showFooter ? <Footer /> : null;
  };

  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <DisplayMessage />
        <RouteChangesWatcher />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userwelcome" element={<UserWelcome />} />
          <Route path="/userdash" element={<UserDash />} />
          <Route path="/my-boats" element={<MyBoats />} />
          <Route path="/my-boat-bookings" element={<MyBoatsBookingPage />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/registerboat" element={<BoatRegister />} />
          <Route path="/edit-boat/:boatId" element={<EditBoat />} />
          <Route path="/boatad/:boatId" element={<BoatAd />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
        <FooterWithRouter />
      </Router>
    </Provider>
  );
}

export default App;