import React from 'react';
import { Form, Field } from 'react-final-form';

function GeneralInfoForm({ onSubmit, initialValues }) {
    const handleFormSubmit = (values) => {
        onSubmit(values);
    };

    return (
        <div>
            <h2>Edit General Boat Information</h2>
            <Form
                initialValues={initialValues}
                onSubmit={handleFormSubmit}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Manufacturer</label>
                            <Field name="manufacturer" component="input" placeholder="Manufacturer" />
                        </div>
                        <div>
                            <label>Model</label>
                            <Field name="model" component="input" placeholder="Model" />
                        </div>
                        <div>
                            <label>Postal Code</label>
                            <Field name="cityHarbour.postalCode" component="input" placeholder="Postal Code" />
                        </div>
                        <div>
                            <label>City</label>
                            <Field name="cityHarbour.city" component="input" placeholder="City" />
                        </div>
                        <div>
                            <label>Description</label>
                            <Field name="description" component="textarea" placeholder="Description" />
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

export default GeneralInfoForm;