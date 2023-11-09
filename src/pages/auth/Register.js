import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import RegisterForm from '../../components/forms/RegisterForm';
import { register } from '../../actions/authActions';

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const successMessage = useSelector(state => state.auth.successMessage);

    React.useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                navigate('/login');
            }, 3000); 

            return () => {
                clearTimeout(timer);
            };
        }

    }, [dispatch, navigate, successMessage]);

    const onSubmit = async (values) => {
        dispatch(register(values));
    };

    return (
        <RegisterForm onSubmit={onSubmit} />
    );
}

export default Register;