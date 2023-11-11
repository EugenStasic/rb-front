import React from 'react';
import { Form, Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import arrayMutators from 'final-form-arrays';
import { format as formatDateFn } from 'date-fns';

function PricingInfoForm({ onSubmit, initialValues }) {
    const formatPricePeriodDates = (pricePeriods) => {
        return pricePeriods.map(period => ({
            ...period,
            fromDate: period.fromDate ? formatDateFn(new Date(period.fromDate), 'yyyy-MM-dd') : '',
            toDate: period.toDate ? formatDateFn(new Date(period.toDate), 'yyyy-MM-dd') : ''
        }));
    };

    const formattedInitialValues = {
        ...initialValues,
        pricePeriods: initialValues.pricePeriods ? formatPricePeriodDates(initialValues.pricePeriods) : []
    };

    const handleFormSubmit = (values) => {
        console.log("Submitted Values:", values);
        onSubmit(values);
    };

    return (
        <div>
            <h2>Edit Pricing Information</h2>
            <Form
                initialValues={formattedInitialValues}
                onSubmit={handleFormSubmit}
                mutators={{ ...arrayMutators }}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Reference Price</label>
                            <Field 
                                name="referencePrice" 
                                component="input" 
                                type="number" 
                                placeholder="Reference Price" 
                            />
                        </div>
                        <div>
                            <label>Minimum Charter Period</label>
                            <Field name="minCharterPeriod" component="select">
                                <option value="">Select Minimum Charter Period</option>
                                <option value="half-day">Half-Day</option>
                                <option value="1 Day">1 Day</option>
                                <option value="2 Days">2 Days</option>
                                <option value="3 Days">3 Days</option>
                                <option value="4 Days">4 Days</option>
                                <option value="5 Days">5 Days</option>
                                <option value="6 Days">6 Days</option>
                                <option value="7 Days">7 Days</option>
                            </Field>
                        </div>
                        <div>
                            <label>Price Periods</label>
                            <FieldArray name="pricePeriods">
                                {({ fields }) => (
                                    <>
                                        {fields.map((name, index) => (
                                            <div key={name}>
                                                <Field 
                                                    name={`${name}.fromDate`} 
                                                    component="input" 
                                                    type="date" 
                                                    placeholder="From Date" 
                                                />
                                                <Field 
                                                    name={`${name}.toDate`} 
                                                    component="input" 
                                                    type="date" 
                                                    placeholder="To Date" 
                                                />
                                                <Field 
                                                    name={`${name}.price`} 
                                                    component="input" 
                                                    type="number" 
                                                    placeholder="Price" 
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
                                            onClick={() => fields.push({ fromDate: '', toDate: '', price: '' })}
                                        >
                                            Add Price Period
                                        </button>
                                    </>
                                )}
                            </FieldArray>
                        </div>
                        <div>
                            <button 
                                type="submit" 
                                disabled={submitting || pristine}
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                )}
            />
        </div>
    );
}

export default PricingInfoForm;