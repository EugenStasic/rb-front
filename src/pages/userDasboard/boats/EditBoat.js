import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBoatInfo, updateBoatInformation } from '../../../actions/boatActions';
import BoatEditForm from '../../../components/forms/BoatEditForm';
import { useParams } from 'react-router';

const EditBoat = () => {
    const { boatId } = useParams();
    const dispatch = useDispatch();
    const { currentBoat, loading} = useSelector(state => state.boat )


    useEffect(() => {
        dispatch(getBoatInfo(boatId));
    }, [dispatch, boatId]);

    const handleSubmit = async (updatedData) => {
       await dispatch(updateBoatInformation(boatId, updatedData));
       dispatch(getBoatInfo(boatId));
    };

    if (loading) {
        return <div>Loading...</div>
    };

    return (
        <div>
            <BoatEditForm
                onSubmit={handleSubmit}
                initialValues={currentBoat}
            />
        </div>
    )

}

export default EditBoat;