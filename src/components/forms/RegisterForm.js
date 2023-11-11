import React from 'react';
import { validateRegister } from '../../utils/utils';
import { Form, Field } from 'react-final-form';

function RegisterForm({ onSubmit }) {
  return (
    <div>
      <h1>Register</h1>
      <Form
        onSubmit={onSubmit}
        validate={validateRegister}
        render={({ handleSubmit, form, submitting, pristine, hasValidationErrors }) => (
          <form onSubmit={handleSubmit}>

            <Field name="firstName">
              {({ input, meta }) => (
                <div>
                  <label>First Name</label>
                  <input {...input} type="text" placeholder="First Name" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>

            <Field name="lastName">
              {({ input, meta }) => (
                <div>
                  <label>Last Name</label>
                  <input {...input} type="text" placeholder="Last Name" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>

            <Field name="email">
              {({ input, meta }) => (
                <div>
                  <label>Email</label>
                  <input {...input} type="email" placeholder="Email" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>

            <Field name="password">
              {({ input, meta }) => (
                <div>
                  <label>Password</label>
                  <input {...input} type="password" placeholder="Password" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>

            <Field name="confirmPassword">
              {({ input, meta }) => (
                <div>
                  <label>Confirm Password</label>
                  <input {...input} type="password" placeholder="Confirm Password" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>

            <div className="buttons">
              <button type="submit" disabled={submitting || hasValidationErrors}>
                Register
              </button>
            </div>
          </form>
        )}
      />
    </div>
  );
}

export default RegisterForm;