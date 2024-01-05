import React, { useState } from 'react';
import { Nav, Container, Row, Col } from 'react-bootstrap';
import GeneralInfoForm from './boateditforms/GeneralInfoForm';
import TechnicalInfoForm from './boateditforms/TechnicalInfoForm';
import PricingInfoForm from './boateditforms/PricingInfoForm';
import BookingInfoForm from './boateditforms/BookingInfoForm';
import EquipmentInfoForm from './boateditforms/EquipmentInfoForm';
import ExtrasInfoForm from './boateditforms/ExtrasInfoForm';
import BoatImagesForm from './boateditforms/boatImagesForm';

const BoatEditForm = ({
  onGeneralInfoSubmit,
  onTechnicalInfoSubmit,
  onPricingInfoSubmit,
  onBookingInfoSubmit,
  onEquipmentInfoSubmit,
  onExtrasInfoSubmit,
  onImagesSubmit,
  initialValues,
}) => {
  const [activeKey, setActiveKey] = useState('general');

  const forms = {
    general: <GeneralInfoForm onSubmit={onGeneralInfoSubmit} initialValues={initialValues.generalInformation} />,
    technical: <TechnicalInfoForm onSubmit={onTechnicalInfoSubmit} initialValues={initialValues.technicalInformation} />,
    pricing: <PricingInfoForm onSubmit={onPricingInfoSubmit} initialValues={initialValues.pricing} />,
    booking: <BookingInfoForm onSubmit={onBookingInfoSubmit} initialValues={initialValues.booking} />,
    equipment: <EquipmentInfoForm onSubmit={onEquipmentInfoSubmit} initialValues={initialValues.equipment} />,
    extras: <ExtrasInfoForm onSubmit={onExtrasInfoSubmit} initialValues={initialValues.extras} />,
    images: <BoatImagesForm onSubmit={onImagesSubmit} existingImages={initialValues.images || []} />,
  };

  return (
    <Container fluid>
      <Row>
        <Col md={3} lg={2} className="sidebar" style={{ backgroundColor: '#ecf0f1' }}>
          <Nav variant="pills" className="flex-column" activeKey={activeKey} onSelect={(selectedKey) => setActiveKey(selectedKey)}>
            <Nav.Item><Nav.Link eventKey="general">General Info</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="technical">Technical Info</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="pricing">Pricing Info</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="booking">Booking Info</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="equipment">Equipment Info</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="extras">Extras Info</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="images">Boat Images</Nav.Link></Nav.Item>
          </Nav>
        </Col>
        <Col md={9} lg={10} className="content-area">
          <h1>Edit Boat Information</h1>
          {forms[activeKey]}
        </Col>
      </Row>
    </Container>
  );
};

export default BoatEditForm;