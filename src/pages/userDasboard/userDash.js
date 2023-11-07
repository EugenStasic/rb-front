import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserInformationForm from '../../components/forms/UserInfo';
import { getUserInfo, updateUserInfo } from '../../actions/userActions';

const UserDash = () => {
    const dispatch = useDispatch();
    const { userInfo, loading, error } = useSelector(state => state.user);
    
    useEffect(() => {
            dispatch(getUserInfo());
    }, [dispatch]);

    const handleSubmit = async (values) => {
        dispatch(updateUserInfo(values));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <UserInformationForm onSubmit={handleSubmit} initialValues={userInfo} />
        </div>
    );
};

export default UserDash;