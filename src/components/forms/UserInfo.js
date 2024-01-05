import React from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
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
        <Container>
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <Card.Title className="text-center" style={{ fontSize: '1.5rem' }}>Personal Information</Card.Title>
                            <hr />
                            <FinalForm
                                onSubmit={onSubmit}
                                initialValues={formattedInitialValues}
                                render={({ handleSubmit, form, submitting, pristine, values }) => (
                                    <Form onSubmit={handleSubmit}>
                                        {/* Date of Birth */}
                                        <Row className="mb-3">
                                            <Form.Group as={Col} md={6}>
                                                <Form.Label>Date of Birth</Form.Label>
                                                <Field name="profile.dateOfBirth" component="input" type="date">
                                                    {({ input }) => <Form.Control {...input} />}
                                                </Field>
                                            </Form.Group>

                                            {/* Gender */}
                                            <Form.Group as={Col} md={6}>
                                                <Form.Label>Gender</Form.Label>
                                                <Field name="profile.gender" component="select">
                                                    {({ input }) => <Form.Control as="select" {...input}>
                                                        <option value="">Select Gender</option>
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
                                                        <option value="Other">Other</option>
                                                    </Form.Control>}
                                                </Field>
                                            </Form.Group>
                                        </Row>

                                        {/* Phone Number */}
                                        <Row className="mb-3">
                                            <Form.Group as={Col} md={6}>
                                                <Form.Label >Phone Number</Form.Label>
                                                <Field name="profile.contact.phone" component="input" type="text">
                                                    {({ input }) => <Form.Control {...input} />}
                                                </Field>
                                            </Form.Group>

                                            {/* City */}
                                            <Form.Group as={Col} md={6}>
                                                <Form.Label>City</Form.Label>
                                                <Field name="profile.contact.address.city" component="input" type="text">
                                                    {({ input }) => <Form.Control {...input} />}
                                                </Field>
                                            </Form.Group>
                                        </Row>

                                        {/* Street & Postal Code */}
                                        <Row className="mb-3">
                                            <Form.Group as={Col} md={6}>
                                                <Form.Label>Street</Form.Label>
                                                <Field name="profile.contact.address.street" component="input" type="text">
                                                    {({ input }) => <Form.Control {...input} />}
                                                </Field>
                                            </Form.Group>

                                            <Form.Group as={Col} md={6}>
                                                <Form.Label>Postal Code</Form.Label>
                                                <Field name="profile.contact.address.postalCode" component="input" type="text">
                                                    {({ input }) => <Form.Control {...input} />}
                                                </Field>
                                            </Form.Group>
                                        </Row>

                                        {/* Nautical Level */}
                                        <Row className="mb-3">
                                            <Form.Group as={Col} md={6}>
                                                <Form.Label>Nautical Level</Form.Label>
                                                <Field name="profile.nauticalLevel" component="select">
                                                    {({ input }) => <Form.Control as="select" {...input}>
                                                        <option value="">Select Nautical Level</option>
                                                        <option value="Beginner">Beginner</option>
                                                        <option value="Intermediate">Intermediate</option>
                                                        <option value="Experienced">Experienced</option>
                                                        <option value="Pro">Pro</option>
                                                    </Form.Control>}
                                                </Field>
                                            </Form.Group>

                                            <Form.Group as={Col} md={6} className="d-flex flex-column">
                                                <Form.Label className="d-block" style={{ fontFamily: '"Source Sans Pro", sans-serif', }}>Yacht License Holder</Form.Label>
                                                <Field name="profile.yachtLicenseHolder" type="checkbox">
                                                {({ input }) => (
                                                    <Form.Check 
                                                    {...input}
                                                    type="checkbox"
                                                    id="yacht-license-holder-checkbox"
                                                    className="d-block mt-2"
                                                    />
                                                )}
                                                </Field>
                                            </Form.Group>
                                        </Row>

                                        <Row>
                                            <Col className="text-center">
                                                <Button type="submit" disabled={submitting} className="mt-3">Save</Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                )}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default UserInformationForm;