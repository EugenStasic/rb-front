import React from 'react';
import { Form, Field } from 'react-final-form';

function BookingInfoForm({ onSubmit, initialValues }) {
    const handleFormSubmit = (values) => {
        onSubmit(values);
    };

    return (
        <div>
            <h2>Edit Booking Information</h2>
            <Form
                initialValues={initialValues}
                onSubmit={handleFormSubmit}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Check-In Time</label>
                            <Field name="checkInTime" component="input" placeholder="Check-In Time" />
                        </div>
                        <div>
                            <label>Check-Out Time</label>
                            <Field name="checkOutTime" component="input" placeholder="Check-Out Time" />
                        </div>
                        <div>
                            <label>Boat License Requirement</label>
                            <Field name="boatLicenseRequirement" component="select">
                                <option value="">Select Option</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </Field>
                        </div>
                        <div>
                            <label>Fuel Cost</label>
                            <Field name="fuelCost" component="select">
                                <option value="">Select Option</option>
                                <option value="Included">Included</option>
                                <option value="Not included">Not included</option>
                            </Field>
                        </div>
                        <div>
                            <label>Cancellation Conditions</label>
                            <Field name="cancellationConditions" component="select">
                                <option value="">Select Option</option>
                                <option value="Flexible">Flexible</option>
                                <option value="Moderate">Moderate</option>
                                <option value="Strict">Strict</option>
                            </Field>
                        </div>
                        <div>
                            <button type="submit" disabled={submitting || pristine}>
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