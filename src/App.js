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
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;