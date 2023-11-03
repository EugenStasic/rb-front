import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import LoginForm from '../../components/forms/LoginForm';
import { login, clearMessages } from '../../actions/authActions';

function Login(){
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error, isAuthenticated } = useSelector(state => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(login(credentials.email, credentials.password));
    }

    useEffect(() =>{
        return () => {
            dispatch(clearMessages());
        }
    }, [dispatch]);

    useEffect(() => {
        if(isAuthenticated) {
            navigate('/userwelcome');
        }
    }, [isAuthenticated, navigate])

    return(
        <LoginForm
            credentials={credentials}
            setCredentials={setCredentials}
            handleSubmit={handleSubmit}
            message={error}
        />
    );
}

export default Login;