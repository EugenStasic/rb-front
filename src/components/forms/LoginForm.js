import React from 'react';
import { Form, Field } from 'react-final-form';
import { validateLogin } from '../../utils/utils';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function LoginForm({ onSubmit, message }) {
  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6} lg={4}>
          <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '0.5rem' }}>  
            <Card.Body>
              <h1 className="text-center mb-4">Log In</h1>
              <hr></hr>
              <Form
                onSubmit={onSubmit}
                validate={validateLogin}
                render={({ handleSubmit, submitting }) => (
                  <form onSubmit={handleSubmit} noValidate>
                    <Field name="email">
                      {({ input, meta }) => (
                        <div className="mb-3">
                          <input {...input} type="email" placeholder="Email" className={`form-control ${meta.error && meta.touched ? 'is-invalid' : ''}`} />
                          {meta.error && meta.touched && <div className="invalid-feedback">{meta.error}</div>}
                        </div>
                      )}
                    </Field>

                    <Field name="password">
                      {({ input, meta }) => (
                        <div className="mb-3">
                          <input {...input} type="password" placeholder="Password" className={`form-control ${meta.error && meta.touched ? 'is-invalid' : ''}`} />
                          {meta.error && meta.touched && <div className="invalid-feedback">{meta.error}</div>}
                        </div>
                      )}
                    </Field>
                    
                    <div className="d-grid gap-2">
                      <Button variant="primary" type="submit" disabled={submitting}>
                        Log In
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

export default LoginForm;