import React from 'react';
import { useDispatch } from 'react-redux';
import BoatRegisterForm from '../../../components/forms/BoatRegisterForm';
import { registerBoat } from '../../../actions/boatActions';

function BoatRegister () {
    const dispatch = useDispatch();

    const onSubmit = async (boatData) => {
        dispatch(registerBoat(boatData));
    };

    return (
        <BoatRegisterForm onSubmit={onSubmit}/>
    )
};

export default BoatRegister;