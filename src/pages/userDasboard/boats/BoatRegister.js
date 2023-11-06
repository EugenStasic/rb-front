import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BoatRegisterForm from '../../../components/forms/BoatRegisterForm';
import { registerBoat } from '../../../actions/boatActions';

function BoatRegister () {
    const dispatch = useDispatch();
    const error = useSelector(state => state.boat.error);
    const successMessage = useSelector(state => state.boat.successMessage)
    const userId = useSelector(state => state.auth.userId)

    const onSubmit = async (values) => {
        dispatch(registerBoat(userId, values));
    }

    return (
        <BoatRegisterForm onSubmit={onSubmit} message={error || successMessage} />
    )
}

export default BoatRegister;