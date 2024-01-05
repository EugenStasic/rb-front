import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUserProfilePic, deleteUserProfilePic, getUserInfo } from '../../actions/userActions';
import { fetchUserProfilePicService } from '../../services/users/userService';
import { Button, Image, Container, Row, Col } from 'react-bootstrap';

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
        <Container>
          <Row className="justify-content-center mb-3">
            <Col xs={12} md={6} className="text-center">
              <h3>Profile Picture</h3>
              {profilePicUrl ? (
                <>
                  <Image src={profilePicUrl} roundedCircle style={{ maxWidth: '150px', maxHeight: '150px', borderRadius: '50%' }}/>
                  <div className="mt-3">
                    <Button onClick={handleDelete} variant="danger">Delete Picture</Button>
                  </div>
                </>
              ) : (
                <div>
                  <input type="file" onChange={handleFileChange} accept="image/*" />
                  <Button variant="primary" className="mt-2">Select an image</Button>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      );
    };
    
    export default UserProfilePic;