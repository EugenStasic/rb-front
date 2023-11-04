import React from 'react';
import { Form, Field } from 'react-final-form';
import { validateLogin } from '../../utils/utils';

function LoginForm({ onSubmit, message }) {
  return (
    <div>
      <h1>Log In</h1>
      <Form
        onSubmit={onSubmit}
        validate={validateLogin}
        render={({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>

            <Field name="email">
              {({ input, meta }) => (
                <div>
                  <input {...input} type="email" placeholder="Email" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>

            <Field name="password">
              {({ input, meta }) => (
                <div>
                  <input {...input} type="password" placeholder="Password" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            
            <button type="submit" disabled={submitting}>Log In</button>
          </form>
        )}
      />
      {message && <p>{message}</p>}
    </div>
  );
}

export default LoginForm;