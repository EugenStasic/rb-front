import React from 'react';
import { Form, Field } from 'react-final-form';

function GeneralInfoForm({ onSubmit, initialValues }) {
    const handleFormSubmit = (values) => {
        onSubmit(values);
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Edit General Boat Information</h2>
            <Form
                initialValues={initialValues}
                onSubmit={handleFormSubmit}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="mb-3">
                            <label className="form-label">Manufacturer</label>
                            <Field name="manufacturer" component="input" placeholder="Manufacturer" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Model</label>
                            <Field name="model" component="input" placeholder="Model" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Postal Code</label>
                            <Field name="cityHarbour.postalCode" component="input" placeholder="Postal Code" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">City</label>
                            <Field name="cityHarbour.city" component="input" placeholder="City" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <Field name="description" component="textarea" placeholder="Description" className="form-control" />
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

export default GeneralInfoForm;