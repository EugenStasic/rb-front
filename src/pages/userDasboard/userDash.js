import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserInformationForm from '../../components/forms/UserInfo';
import { updateUserInfo } from '../../actions/userActions';
import UserProfilePic from '../../components/forms/UserProfilePic';
import { Container, Row, Col } from 'react-bootstrap';
import ProfileSidebar from '../../components/common/ProfileSideBar';

const UserDash = () => {
    const dispatch = useDispatch();
    const { userInfo, loading } = useSelector(state => state.user);
    

    const handleSubmit = async (values) => {
        dispatch(updateUserInfo(values));
    };

    if (loading) {
        return <div>Loading...</div>;
    };

    const bodyStyle = {
        fontFamily: '"Source Sans Pro", sans-serif',
        color: '#333333',
    };

    return (
        <Container fluid style={bodyStyle}>
            <Row>
                <ProfileSidebar />
                <Col md={9} >
                    <UserProfilePic />
                    <UserInformationForm
                        onSubmit={handleSubmit}
                        initialValues={userInfo}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default UserDash;