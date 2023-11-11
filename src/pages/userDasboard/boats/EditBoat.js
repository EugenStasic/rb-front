import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBoatInfo, updateBoatInformation } from '../../../actions/boatActions';
import BoatEditForm from '../../../components/forms/BoatEditForm';
import { useParams } from 'react-router';

const EditBoat = () => {
    const { boatId } = useParams();
    const dispatch = useDispatch();
    const { currentBoat, loading } = useSelector(state => state.boat);

    useEffect(() => {
        dispatch(getBoatInfo(boatId));
    }, [dispatch, boatId]);

    const handleGeneralInfoUpdate = async (generalInfo) => {
       await dispatch(updateBoatInformation(boatId, { generalInformation: generalInfo }));
    };

    const handleTechnicalInfoUpdate = async (technicalInfo) => {
       await dispatch(updateBoatInformation(boatId, { technicalInformation: technicalInfo }));
    };

    const handlePricingInfoUpdate = async (pricingInfo) => {
       await dispatch(updateBoatInformation(boatId, { pricing: pricingInfo }));
    };

    const handleBookingInfoUpdate = async (bookingInfo) => {
       await dispatch(updateBoatInformation(boatId, { booking: bookingInfo }));
    };

    const handleEquipmentInfoUpdate = async (equipmentInfo) => {
       await dispatch(updateBoatInformation(boatId, { equipment: equipmentInfo }));
    };

    const handleExtrasInfoUpdate = async (extrasInfo) => {
       await dispatch(updateBoatInformation(boatId, { extras: extrasInfo }));
    };

    if (loading || !currentBoat) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <BoatEditForm
                onGeneralInfoSubmit={handleGeneralInfoUpdate}
                onTechnicalInfoSubmit={handleTechnicalInfoUpdate}
                onPricingInfoSubmit={handlePricingInfoUpdate}
                onBookingInfoSubmit={handleBookingInfoUpdate}
                onEquipmentInfoSubmit={handleEquipmentInfoUpdate}
                onExtrasInfoSubmit={handleExtrasInfoUpdate}
                initialValues={currentBoat}
            />
        </div>
    );
}

export default EditBoat;