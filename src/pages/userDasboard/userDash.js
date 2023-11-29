import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserInformationForm from '../../components/forms/UserInfo';
import { updateUserInfo } from '../../actions/userActions';
import UserProfilePic from '../../components/forms/UserProfilePic';

const UserDash = () => {
    const dispatch = useDispatch();
    const { userInfo, loading } = useSelector(state => state.user);
    

    const handleSubmit = async (values) => {
        dispatch(updateUserInfo(values));
    };

    if (loading) {
        return <div>Loading...</div>;
    };

    return (
        <div>
            <UserInformationForm
                onSubmit={handleSubmit}
                initialValues={userInfo}
            />
            <UserProfilePic />
        </div>
    );
};

export default UserDash;