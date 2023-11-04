import React from 'react';
import { Form, Field } from 'react-final-form';
import { format as formatDateFn } from 'date-fns';

const UserInformationForm = ({ onSubmit, initialValues }) => {

    const formattedInitialValues = {
        ...initialValues,
        profile: {
            ...initialValues.profile,
            dateOfBirth: initialValues.profile && initialValues.profile.dateOfBirth
                ? formatDateFn(new Date(initialValues.profile.dateOfBirth), 'yyyy-MM-dd')
                : ''
        }
    };

    return (
        <div>
            <h1>User Information</h1>
            <Form
                onSubmit={onSubmit}
                initialValues={formattedInitialValues}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit}>
                        
                        <Field name="profile.dateOfBirth" component="input" type="date">
                            {({ input, meta }) => (
                                <div>
                                    <label>Date of Birth</label>
                                    <input {...input} type="date" />
                                </div>
                            )}
                        </Field>

                        <Field name="profile.gender" component="select">
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </Field>

                        <Field name="profile.contact.phone" component="input" type="text">
                            {({input, meta}) => (
                                <div>
                                    <label>Phone Number</label>
                                    <input {...input} type="text" />
                                </div>
                            )}
                        </Field>

                        <Field name="profile.contact.address.city" component="input" type="text">
                            {({input, meta}) => (
                                <div>
                                    <label>City</label>
                                    <input {...input} type="text" />
                                </div>
                            )}
                        </Field>

                        <Field name="profile.contact.address.postalCode" component="input" type="text">
                            {({input, meta}) => (
                                <div>
                                    <label>Postal Code</label>
                                    <input {...input} type="text" />
                                </div>
                            )}
                        </Field>

                        <Field name="profile.contact.address.street" component="input" type="text">
                            {({input, meta}) => (
                                <div>
                                    <label>Street</label>
                                    <input {...input} type="text" />
                                </div>
                            )}
                        </Field>

                        <Field name="profile.nauticalLevel" component="select">
                            <option value="">Select Nautical Level</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Experienced">Experienced</option>
                            <option value="Pro">Pro</option>
                        </Field>

                        <Field name="profile.yachtLicenseHolder" type="checkbox">
                            {({ input, meta }) => (
                                <div>
                                    <label>Yacht License Holder</label>
                                    <input {...input} type="checkbox" />
                                </div>
                            )}
                        </Field>

                        <button type="submit" disabled={submitting}>
                            Save
                        </button>
                    </form>
                )}
            />
        </div>
    );
};

export default UserInformationForm;