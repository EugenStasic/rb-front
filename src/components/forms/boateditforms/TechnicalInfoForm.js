import React from 'react';
import { Form, Field } from 'react-final-form';

function TechnicalInfoForm({ onSubmit, initialValues }) {
    const handleFormSubmit = (values) => {
        onSubmit(values);
    };

    return (
        <div>
            <h2>Edit Technical Boat Information</h2>
            <Form
                initialValues={initialValues}
                onSubmit={handleFormSubmit}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Boat Length</label>
                            <Field name="boatLength" component="input" type="number" placeholder="Boat Length" />
                        </div>
                        <div>
                            <label>Onboard Capacity</label>
                            <Field name="onboardCapacity" component="input" type="number" placeholder="Onboard Capacity" />
                        </div>
                        <div>
                            <label>Engine Type</label>
                            <Field name="engineType" component="select">
                                <option value="">Select Engine Type</option>
                                <option value="Inboard">Inboard</option>
                                <option value="Outboard">Outboard</option>
                            </Field>
                        </div>
                        <div>
                            <label>Engine Power</label>
                            <Field name="enginePower" component="input" type="number" placeholder="Engine Power" />
                        </div>
                        <div>
                            <label>Average Fuel Consumption</label>
                            <Field name="avgFuelConsumption" component="input" type="number" placeholder="Avg Fuel Consumption" />
                        </div>
                        <div>
                            <label>Year of Construction</label>
                            <Field name="yearOfConstruction" component="input" type="number" placeholder="Year of Construction" />
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

export default TechnicalInfoForm;