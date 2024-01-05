import React from 'react';
import { Form, Field } from 'react-final-form';
import { validateRegister } from '../../utils/utils';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function RegisterForm({ onSubmit }) {
  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={8} lg={6}>
          <Card className="shadow">
            <Card.Body>
              <h1 className="text-center mb-4">Register</h1>
              <hr></hr>
              <Form
                onSubmit={onSubmit}
                validate={validateRegister}
                render={({ handleSubmit, form, submitting, pristine, hasValidationErrors }) => (
                  <form onSubmit={handleSubmit} noValidate>
                    <Row>
                      <Col md={6}>
                        <Field name="firstName">
                          {({ input, meta }) => (
                            <div className="mb-3">
                              <label className="form-label">First Name</label>
                              <input {...input} type="text" placeholder="First Name" className={`form-control ${meta.error && meta.touched ? 'is-invalid' : ''}`} />
                              {meta.error && meta.touched && <div className="invalid-feedback">{meta.error}</div>}
                            </div>
                          )}
                        </Field>
                      </Col>
                      <Col md={6}>
                        <Field name="lastName">
                          {({ input, meta }) => (
                            <div className="mb-3">
                              <label className="form-label">Last Name</label>
                              <input {...input} type="text" placeholder="Last Name" className={`form-control ${meta.error && meta.touched ? 'is-invalid' : ''}`} />
                              {meta.error && meta.touched && <div className="invalid-feedback">{meta.error}</div>}
                            </div>
                          )}
                        </Field>
                      </Col>
                    </Row>
                    
                    <Field name="email">
                      {({ input, meta }) => (
                        <div className="mb-3">
                          <label className="form-label">Email</label>
                          <input {...input} type="email" placeholder="Email" className={`form-control ${meta.error && meta.touched ? 'is-invalid' : ''}`} />
                          {meta.error && meta.touched && <div className="invalid-feedback">{meta.error}</div>}
                        </div>
                      )}
                    </Field>

                    <Field name="password">
                      {({ input, meta }) => (
                        <div className="mb-3">
                          <label className="form-label">Password</label>
                          <input {...input} type="password" placeholder="Password" className={`form-control ${meta.error && meta.touched ? 'is-invalid' : ''}`} />
                          {meta.error && meta.touched && <div className="invalid-feedback">{meta.error}</div>}
                        </div>
                      )}
                    </Field>

                    <Field name="confirmPassword">
                      {({ input, meta }) => (
                        <div className="mb-3">
                          <label className="form-label">Confirm Password</label>
                          <input {...input} type="password" placeholder="Confirm Password" className={`form-control ${meta.error && meta.touched ? 'is-invalid' : ''}`} />
                          {meta.error && meta.touched && <div className="invalid-feedback">{meta.error}</div>}
                        </div>
                      )}
                    </Field>

                    <div className="d-grid gap-2 mt-4">
                      <Button type="submit" variant="primary" disabled={submitting || hasValidationErrors}>
                        Register
                      </Button>
                    </div>
                  </form>
                )}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default RegisterForm;