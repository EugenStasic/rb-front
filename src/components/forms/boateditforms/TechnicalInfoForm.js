import React from 'react';
import { Form, Field } from 'react-final-form';

function TechnicalBoatInfoForm({ onSubmit, initialValues }) {
    const handleFormSubmit = (values) => {
        onSubmit(values);
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Edit Technical Boat Information</h2>
            <Form
                initialValues={initialValues}
                onSubmit={handleFormSubmit}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Boat Length</label>
                            <Field name="boatLength" component="input" type="number" placeholder="Boat Length" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Onboard Capacity</label>
                            <Field name="onboardCapacity" component="input" type="number" placeholder="Onboard Capacity" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Engine Type</label>
                            <Field name="engineType" component="select" className="form-select">
                                <option value="">Select Engine Type</option>
                                <option value="Inboard">Inboard</option>
                                <option value="Outboard">Outboard</option>
                            </Field>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Engine Power</label>
                            <Field name="enginePower" component="input" type="number" placeholder="Engine Power" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Average Fuel Consumption</label>
                            <Field name="avgFuelConsumption" component="input" type="number" placeholder="Avg Fuel Consumption" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Year of Construction</label>
                            <Field name="yearOfConstruction" component="input" type="number" placeholder="Year of Construction" className="form-control" />
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

export default TechnicalBoatInfoForm;