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
import { clearMessages } from './actions/authActions';

const RouteChangesWatcher = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(clearMessages());
  }, [location, dispatch]);

  return null;
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <RouteChangesWatcher />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userwelcome" element={<UserWelcome />} />
          <Route path="/userdash" element={<UserDash />} />
          <Route path="/my-boats" element={<MyBoats />} />
          <Route path="/registerboat" element={<BoatRegister />} />
          <Route path="/edit-boat/:boatId" element={<EditBoat />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;