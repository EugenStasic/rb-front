import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBoatInfo, updateBoatInformation, updateBoatImages } from '../../../actions/boatActions';
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

    const handleImagesUpdate = async (newImages) => {
        const formData = new FormData();
    
        newImages.forEach(image => formData.append('images', image));
        console.log('FormData for update:', formData);
        await dispatch(updateBoatImages(boatId, formData));
        
        dispatch(getBoatInfo(boatId));
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
                onImagesSubmit={handleImagesUpdate}
                initialValues={currentBoat}
            />
        </div>
    );
}

export default EditBoat;