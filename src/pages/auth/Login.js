import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from '../../components/forms/LoginForm';
import { login } from '../../actions/authActions';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(state => state.auth);

    const handleSubmit = values => {
        dispatch(login(values.email, values.password));
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/userwelcome');
        }

    }, [ isAuthenticated, navigate]);

    return (
        <LoginForm onSubmit={handleSubmit} />
    );
}

export default Login;