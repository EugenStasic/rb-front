import React from 'react';
import { Form, Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import arrayMutators from 'final-form-arrays';

function ExtrasInfoForm({ onSubmit, initialValues }) {
    const handleFormSubmit = (values) => {
        onSubmit(values.extras);
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Edit Extras Information</h2>
            <Form
                initialValues={{ extras: initialValues }}
                onSubmit={handleFormSubmit}
                mutators={{ ...arrayMutators }}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Extras</label>
                            <FieldArray name="extras">
                                {({ fields }) => (
                                    <>
                                        {fields.map((name, index) => (
                                            <div key={name} className="mb-2">
                                                <Field
                                                    name={`${name}.option`}
                                                    component="input"
                                                    placeholder="Extra Option"
                                                    className="form-control me-2"
                                                />
                                                <Field
                                                    name={`${name}.pricePerDay`}
                                                    component="input"
                                                    type="number"
                                                    placeholder="Price Per Day"
                                                    className="form-control me-2"
                                                />
                                                <button
                                                    type="button"
                                                    className="btn btn-danger me-2"
                                                    onClick={() => fields.remove(index)}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            className="btn btn-secondary mb-2"
                                            onClick={() => fields.push({ option: '', pricePerDay: '' })}
                                        >
                                            Add Extra
                                        </button>
                                    </>
                                )}
                            </FieldArray>
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

export default ExtrasInfoForm;