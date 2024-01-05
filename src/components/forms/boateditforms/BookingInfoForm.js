import React from 'react';
import { Form, Field } from 'react-final-form';

function BookingInfoForm({ onSubmit, initialValues }) {
    const handleFormSubmit = (values) => {
        onSubmit(values);
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Edit Booking Information</h2>
            <Form
                initialValues={initialValues}
                onSubmit={handleFormSubmit}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="mb-3">
                            <label className="form-label">Check-In Time</label>
                            <Field name="checkInTime" component="select" className="form-select">
                                <option value="">Select Check-In Time</option>
                                <option value="06:00 AM">06:00 AM</option>
                                <option value="07:00 AM">07:00 AM</option>
                                <option value="08:00 AM">08:00 AM</option>
                                <option value="09:00 AM">09:00 AM</option>
                                <option value="10:00 AM">10:00 AM</option>
                                <option value="11:00 AM">11:00 AM</option>
                                <option value="12:00 PM">12:00 PM</option>
                            </Field>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Check-Out Time</label>
                            <Field name="checkOutTime" component="select" className="form-select">
                                <option value="">Select Check-Out Time</option>
                                <option value="12:00 PM">12:00 PM</option>
                                <option value="01:00 PM">01:00 PM</option>
                                <option value="02:00 PM">02:00 PM</option>
                                <option value="03:00 PM">03:00 PM</option>
                                <option value="04:00 PM">04:00 PM</option>
                                <option value="05:00 PM">05:00 PM</option>
                                <option value="06:00 PM">06:00 PM</option>
                                <option value="07:00 PM">07:00 PM</option>
                                <option value="08:00 PM">08:00 PM</option>
                                <option value="09:00 PM">09:00 PM</option>
                            </Field>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Boat License Requirement</label>
                            <Field name="boatLicenseRequirement" component="select" className="form-select">
                                <option value="">Select Option</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </Field>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Fuel Cost</label>
                            <Field name="fuelCost" component="select" className="form-select">
                                <option value="">Select Option</option>
                                <option value="Included">Included</option>
                                <option value="Not included">Not included</option>
                            </Field>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Cancellation Conditions</label>
                            <Field name="cancellationConditions" component="select" className="form-select">
                                <option value="">Select Option</option>
                                <option value="Flexible">Flexible</option>
                                <option value="Moderate">Moderate</option>
                                <option value="Strict">Strict</option>
                            </Field>
                        </div>
                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-primary" disabled={submitting || pristine}>
                                Save Changes
                            </button>
                        </div>
                    </form>
                )}
            />
        </div>
    );    
}

export default BookingInfoForm;