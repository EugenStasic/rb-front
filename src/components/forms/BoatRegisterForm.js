import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { validateBoatRegister } from '../../utils/utils';
import { Form as BootstrapForm, Button, Row, Col, Container, Card } from 'react-bootstrap';

function BoatRegisterForm({ onSubmit }) {
    const [files, setFiles] = useState([]);

    const handleFileChange = (event) => {
        setFiles([...event.target.files]);
    };

    const handleSubmit = async (values) => {
        const formData = new FormData();
        const dataToSubmit = { ...values };
        delete dataToSubmit.images;
        formData.append('data', JSON.stringify(dataToSubmit));

        files.forEach(file => {
            formData.append('images', file);
        });

        await onSubmit(formData);
    };

    return (
        <Container className="mt-4">
            <Card>
                <Card.Header>
                    <h1>Boat Registration</h1>
                </Card.Header>
                <Card.Body>
                    <Form
                        onSubmit={handleSubmit}
                        validate={validateBoatRegister}
                        render={({ handleSubmit, form, submitting, pristine, hasValidationErrors }) => (
                            <BootstrapForm onSubmit={handleSubmit} noValidate>
                                <Row className="mb-3">
                                    <Col md={6}>
                                        <BootstrapForm.Group controlId="formBoatType">
                                            <BootstrapForm.Label>Boat Type</BootstrapForm.Label>
                                            <Field name="generalInformation.type" component="select" className="form-control">
                                                <option value="">Select Boat Type</option>
                                                <option value="Motorboat">Motorboat</option>
                                                <option value="Sailboat">Sailboat</option>
                                                <option value="RIB">RIB</option>
                                                <option value="Catamaran">Catamaran</option>
                                                <option value="Jet-Ski">Jet-Ski</option>
                                                <option value="Yacht">Yacht</option>
                                            </Field>
                                        </BootstrapForm.Group>
                                    </Col>
                                    <Col md={6}>
                                        <BootstrapForm.Group controlId="formManufacturer">
                                            <BootstrapForm.Label>Manufacturer</BootstrapForm.Label>
                                            <Field name="generalInformation.manufacturer" component="input" placeholder="Boat Manufacturer" className="form-control" />
                                        </BootstrapForm.Group>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col md={6}>
                                        <BootstrapForm.Group controlId="formModel">
                                            <BootstrapForm.Label>Model</BootstrapForm.Label>
                                            <Field name="generalInformation.model" component="input" placeholder="Boat Model" className="form-control" />
                                        </BootstrapForm.Group>
                                    </Col>
                                    <Col md={6}>
                                        <BootstrapForm.Group controlId="formPostalCode">
                                            <BootstrapForm.Label>Postal Code</BootstrapForm.Label>
                                            <Field name="generalInformation.cityHarbour.postalCode" component="input" placeholder="Postal Code" className="form-control" />
                                        </BootstrapForm.Group>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col md={6}>
                                        <BootstrapForm.Group controlId="formCity">
                                            <BootstrapForm.Label>City</BootstrapForm.Label>
                                            <Field name="generalInformation.cityHarbour.city" component="input" placeholder="City" className="form-control" />
                                        </BootstrapForm.Group>
                                    </Col>
                                    <Col md={6}>
                                        <BootstrapForm.Group controlId="formBoatLength">
                                            <BootstrapForm.Label>Boat Length (m)</BootstrapForm.Label>
                                            <Field name="technicalInformation.boatLength" component="input" type="number" placeholder="Boat Length" className="form-control" />
                                        </BootstrapForm.Group>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col md={6}>
                                        <BootstrapForm.Group controlId="formOnboardCapacity">
                                            <BootstrapForm.Label>Onboard Capacity</BootstrapForm.Label>
                                            <Field name="technicalInformation.onboardCapacity" component="input" type="number" placeholder="Number of People" className="form-control" />
                                        </BootstrapForm.Group>
                                    </Col>
                                    <Col md={6}>
                                        <BootstrapForm.Group controlId="formEngineType">
                                            <BootstrapForm.Label>Engine Type</BootstrapForm.Label>
                                            <Field name="technicalInformation.engineType" component="select" className="form-control">
                                                <option value="">Select Engine Type</option>
                                                <option value="Inboard">Inboard</option>
                                                <option value="Outboard">Outboard</option>
                                            </Field>
                                        </BootstrapForm.Group>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col md={6}>
                                        <BootstrapForm.Group controlId="formEnginePower">
                                            <BootstrapForm.Label>Engine Power (HP)</BootstrapForm.Label>
                                            <Field name="technicalInformation.enginePower" component="input" type="number" placeholder="Engine Power" className="form-control" />
                                        </BootstrapForm.Group>
                                    </Col>
                                    <Col md={6}>
                                        <BootstrapForm.Group controlId="formBoatImages">
                                            <BootstrapForm.Label>Boat Images</BootstrapForm.Label>
                                            <BootstrapForm.Control
                                                type="file"
                                                multiple
                                                onChange={handleFileChange}
                                                isInvalid={hasValidationErrors}
                                            />
                                        </BootstrapForm.Group>
                                    </Col>
                                </Row>
                                <Button type="submit" variant="primary" size="lg" block disabled={submitting || pristine || hasValidationErrors}>
                                    Register the boat
                                </Button>
                            </BootstrapForm>
                        )}
                    />
                </Card.Body>
            </Card>
        </Container>
    );
}

export default BoatRegisterForm;