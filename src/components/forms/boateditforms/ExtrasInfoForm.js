import React from 'react';
import { Form, Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import arrayMutators from 'final-form-arrays';

function ExtrasInfoForm({ onSubmit, initialValues }) {
    const handleFormSubmit = (values) => {
        onSubmit(values.extras);
    };

    return (
        <div>
            <h2>Edit Extras Information</h2>
            <Form
                initialValues={{ extras: initialValues }}
                onSubmit={handleFormSubmit}
                mutators={{ ...arrayMutators }}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Extras</label>
                            <FieldArray name="extras">
                                {({ fields }) => (
                                    <>
                                        {fields.map((name, index) => (
                                            <div key={name}>
                                                <Field
                                                    name={`${name}.option`}
                                                    component="input"
                                                    placeholder="Extra Option"
                                                />
                                                <Field
                                                    name={`${name}.pricePerDay`}
                                                    component="input"
                                                    type="number"
                                                    placeholder="Price Per Day"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => fields.remove(index)}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => fields.push({ option: '', pricePerDay: '' })}
                                        >
                                            Add Extra
                                        </button>
                                    </>
                                )}
                            </FieldArray>
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

export default ExtrasInfoForm;