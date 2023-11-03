import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import RegisterForm from '../../components/forms/RegisterForm';
import { register, registerError } from '../../actions/authActions';

function Register() {
    const [userData, setUserData] = useState({ username: '', email: '', password: '', confirmPassword: ''})
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector(state => state.auth.error);
    const successMessage = useSelector(state => state.auth.successMessage)

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (userData.password !== userData.confirmPassword) {
            dispatch(registerError("Passwords do not match!"));
            return;
        }

        dispatch(register(userData));
    }

    const handleContinue = () => {
        navigate('/login');
    }

    if (successMessage) {
        return (
            <div>
                <p>{successMessage}</p>
                <button onClick={handleContinue}>Continue to Login</button>
            </div>
        )
    }

    return (
        <RegisterForm
            userData={userData}
            setUserData={setUserData}
            handleSubmit={handleSubmit}
            message={error}
        />
    );
}

export default Register;