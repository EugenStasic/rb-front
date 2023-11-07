import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBoatInfo, updateBoatInformation } from '../../../actions/boatActions';
import BoatEditForm from '../../../components/forms/BoatEditForm';
import { useParams } from 'react-router';

const EditBoat = () => {
    const { boatId } = useParams();
    const dispatch = useDispatch();
    const loading = useSelector(state => state.boat.loading);
    const boat = useSelector(state => state.boat.currentBoat);
    const error = useSelector(state => state.boat.error);


    useEffect(() => {
        dispatch(getBoatInfo(boatId));
    }, [dispatch, boatId]);

    const handleSubmit = async (updatedData) => {
       dispatch(updateBoatInformation(boatId, updatedData));
    };

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div>
            <BoatEditForm
            onSubmit={handleSubmit}
            initialValues={boat}
            />
        </div>
    )

}

export default EditBoat;