import React from 'react';
import { useDispatch } from 'react-redux';
import BoatRegisterForm from '../../../components/forms/BoatRegisterForm';
import { registerBoat } from '../../../actions/boatActions';
import { Container, Row, Col } from 'react-bootstrap';
import ProfileSidebar from '../../../components/common/ProfileSideBar';

function BoatRegister () {
    const dispatch = useDispatch();

    const onSubmit = async (boatData) => {
        dispatch(registerBoat(boatData));
    };

    return (
        <Container fluid>
            <Row>
                <ProfileSidebar />
                <Col md={9} lg={10}>
                    <BoatRegisterForm onSubmit={onSubmit}/>
                </Col>
            </Row>
        </Container>
    );
};

export default BoatRegister;