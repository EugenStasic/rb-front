import React from 'react';
import GeneralInfoForm from './boateditforms/GeneralInfoForm';
import TechnicalInfoForm from './boateditforms/TechnicalInfoForm';
import PricingInfoForm from './boateditforms/PricingInfoForm';
import BookingInfoForm from './boateditforms/BookingInfoForm';
import EquipmentInfoForm from './boateditforms/EquipmentInfoForm';
import ExtrasInfoForm from './boateditforms/ExtrasInfoForm';
import BoatImagesForm from './boateditforms/boatImagesForm';

const BoatEditForm = ({
  onGeneralInfoSubmit,
  onTechnicalInfoSubmit,
  onPricingInfoSubmit,
  onBookingInfoSubmit,
  onEquipmentInfoSubmit,
  onExtrasInfoSubmit,
  onImagesSubmit,
  initialValues,
}) => {

    return (
        <div>
            <h1>Edit Boat Information</h1>
            <GeneralInfoForm
                onSubmit={onGeneralInfoSubmit}
                initialValues={initialValues.generalInformation}
            />
            <TechnicalInfoForm
                onSubmit={onTechnicalInfoSubmit}
                initialValues={initialValues.technicalInformation}
            />
            <PricingInfoForm
                onSubmit={onPricingInfoSubmit}
                initialValues={initialValues.pricing}
            />
            <BookingInfoForm
                onSubmit={onBookingInfoSubmit}
                initialValues={initialValues.booking}
            />
            <EquipmentInfoForm
                onSubmit={onEquipmentInfoSubmit}
                initialValues={initialValues.equipment}
            />
            <ExtrasInfoForm
                onSubmit={onExtrasInfoSubmit}
                initialValues={initialValues.extras}
            />
            <BoatImagesForm
                onSubmit={onImagesSubmit}
                existingImages={initialValues.images || []}
            />
        </div>
    );
};

export default BoatEditForm;