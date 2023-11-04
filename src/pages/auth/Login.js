import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from '../../components/forms/LoginForm';
import { login, clearMessages } from '../../actions/authActions';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error, isAuthenticated } = useSelector(state => state.auth);

    const handleSubmit = values => {
        dispatch(login(values.email, values.password));
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/userwelcome');
        }

        return () => {
            dispatch(clearMessages());
        };
    }, [dispatch, isAuthenticated, navigate]);

    return (
        <LoginForm onSubmit={handleSubmit} message={error} />
    );
}

export default Login;