import React from 'react';
import { Form, Field } from 'react-final-form';
import { validateBoatRegister } from '../../utils/utils';

function BoatRegisterForm({ onSubmit, message }) {
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
                            <Field name="type" component="select">
                                <option value="">Select Boat Type</option>
                                <option value="Motorboat">Motorboat</option>
                                <option value="Sailboat">Sailboat</option>
                                <option value="RIB">RIB</option>
                                <option value="Catamaran">Catamaran</option>
                                <option value="Jet-Ski">Jet-Ski</option>
                                <option value="Yacht">Yacht</option>
                            </Field>
                        </div>
                        <Field name="manufacturer">
                            {({ input, meta }) => (
                                <div>
                                    <label>Manufacturer</label>
                                    <input {...input} type="text" placeholder="Boat Manufacturer" />
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                            )}
                        </Field>

                        <Field name="model">
                            {({ input, meta }) => (
                                <div>
                                    <label>Model</label>
                                    <input {...input} type="text" placeholder="Boat Model" />
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                            )}
                        </Field>

                        <Field name="cityHarbour">
                            {({ input, meta }) => (
                                <div>
                                    <label>City/Harbour</label>
                                    <input {...input} type="text" placeholder="Boat City/Harbour" />
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                            )}
                        </Field>

                        <div>
                            <label>Skipper Option</label>
                            <Field name="skipperOption" component="select" id="skipperOption">
                                <option value="" disabled>Skipper requirement</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                                <option value="Both">Both</option>
                            </Field>
                        </div>

                        <Field name="capacity">
                            {({ input, meta }) => (
                                <div>
                                    <label>Capacity</label>
                                    <input {...input} type="number" placeholder="Boat Capacity" />
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                            )}
                        </Field>

                        <Field name="length">
                            {({ input, meta }) => (
                                <div>
                                    <label>Length</label>
                                    <input {...input} type="number" placeholder="Boat Length" />
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                            )}
                        </Field>

                        <div>
                            <label>Engine Type</label>
                            <Field name="engine.type" component="select" id="engine.type">
                                <option value="" disabled>Engine Type</option>
                                <option value="Inboard">Inboard</option>
                                <option value="Outboard">Outboard</option>
                            </Field>
                        </div>

                        <Field name="engine.power">
                            {({ input, meta }) => (
                                <div>
                                    <label>Engine Power</label>
                                    <input {...input} type="number" placeholder="Boat Engine Power" />
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                            )}
                        </Field>
                        
                        <div className="buttons">
                            <button type="submit" disabled={submitting || hasValidationErrors}>Register the boat</button>
                        </div>
                        {message && <p>{message}</p>}
                    </form>
                )}
            />
        </div>
    )
}

export default BoatRegisterForm;