import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import RegisterForm from '../../components/forms/RegisterForm';
import { register, clearMessages } from '../../actions/authActions';

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector(state => state.auth.error);
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

        return () => {
            dispatch(clearMessages());
        };
    }, [dispatch, navigate, successMessage]);

    const onSubmit = async (values) => {
        dispatch(register(values));
    };

    if (successMessage) {
        return (
            <div>
                <p>{successMessage}</p>
            </div>
        );
    }

    return (
        <RegisterForm onSubmit={onSubmit} message={error} />
    );
}

export default Register;