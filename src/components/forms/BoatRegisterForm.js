import React from 'react';
import { Form, Field } from 'react-final-form';
import { validateBoatRegister } from '../../utils/utils';

function BoatRegisterForm({ onSubmit }) {
    return (
        <div>
            <h1>Boat Registration</h1>
            <Form
                onSubmit={onSubmit}
                validate={validateBoatRegister}
                render={({ handleSubmit, form, submitting, pristine, hasValidationErrors }) => (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Boat Type</label>
                            <Field name="generalInformation.type" component="select">
                                <option value="">Select Boat Type</option>
                                <option value="Motorboat">Motorboat</option>
                                <option value="Sailboat">Sailboat</option>
                                <option value="RIB">RIB</option>
                                <option value="Catamaran">Catamaran</option>
                                <option value="Jet-Ski">Jet-Ski</option>
                                <option value="Yacht">Yacht</option>
                            </Field>
                        </div>

                        <Field name="generalInformation.manufacturer">
                            {({ input, meta }) => (
                                <div>
                                    <label>Manufacturer</label>
                                    <input {...input} type="text" placeholder="Boat Manufacturer" />
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                            )}
                        </Field>

                        <Field name="generalInformation.model">
                            {({ input, meta }) => (
                                <div>
                                    <label>Model</label>
                                    <input {...input} type="text" placeholder="Boat Model" />
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                            )}
                        </Field>

                        <Field name="generalInformation.cityHarbour.postalCode">
                            {({ input, meta }) => (
                                <div>
                                    <label>Postal Code</label>
                                    <input {...input} type="text" placeholder="Postal Code" />
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                            )}
                        </Field>

                        <Field name="generalInformation.cityHarbour.city">
                            {({ input, meta }) => (
                                <div>
                                    <label>City</label>
                                    <input {...input} type="text" placeholder="City" />
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                            )}
                        </Field>

                        <Field name="technicalInformation.boatLength">
                            {({ input, meta }) => (
                                <div>
                                    <label>Boat Length (m)</label>
                                    <input {...input} type="number" placeholder="Boat Length" />
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                            )}
                        </Field>

                        <Field name="technicalInformation.onboardCapacity">
                            {({ input, meta }) => (
                                <div>
                                    <label>Onboard Capacity</label>
                                    <input {...input} type="number" placeholder="Number of People" />
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                            )}
                        </Field>

                        <div>
                        <label>Engine Type</label> 
                        <Field name="technicalInformation.engineType"component="select">
                                <option value="">Select Engine Type</option>
                                <option value="Inboard">Inboard</option>
                                <option value="Outboard">Outboard</option>
                        </Field>
                        </div>

                        <Field name="technicalInformation.enginePower">
                            {({ input, meta }) => (
                                <div>
                                    <label>Engine Power (HP)</label>
                                    <input {...input} type="number" placeholder="Engine Power" />
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                            )}
                        </Field>

                        <div className="buttons">
                            <button type="submit" disabled={submitting || pristine || hasValidationErrors}>
                                Register the boat
                            </button>
                        </div>
                    </form>
                )}
            />
        </div>
    )
}

export default BoatRegisterForm;