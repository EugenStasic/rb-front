import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUserProfilePic, deleteUserProfilePic, getUserInfo } from '../../actions/userActions';
import { fetchUserProfilePicService } from '../../services/users/userService';

const UserProfilePic = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.user);
    const [profilePicUrl, setProfilePicUrl] = useState('');

    useEffect(() => {
        if (userInfo.profilePic && userInfo.profilePic.data) {
            const fetchProfilePic = async () => {
                try {
                    const url = await fetchUserProfilePicService();
                    setProfilePicUrl(url);
                } catch (error) {
                    console.error('Error fetching profile picture:', error);
                }
            };

            fetchProfilePic();
        }
    }, [userInfo.profilePic]);

    const handleFileChange = (e) => {
        const formData = new FormData();
        if (e.target.files[0]) {
            formData.append('profilePic', e.target.files[0]);
            dispatch(addUserProfilePic(formData));
            dispatch(getUserInfo());
        }
    };

    const handleDelete = () => {
        dispatch(deleteUserProfilePic());
        setProfilePicUrl(''); 
    };

    return (
        <div>
            <h1>Update Profile Picture</h1>
            {profilePicUrl ? (
                <div>
                    <img src={profilePicUrl} alt="Profile" />
                    <button onClick={handleDelete}>Delete Picture</button>
                </div>
            ) : (
                <input type="file" onChange={handleFileChange} accept="image/*" />
            )}
        </div>
    );
};

export default UserProfilePic;