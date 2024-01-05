import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBooking } from '../../../actions/bookingActions';
import { Card, Form, Button, ListGroup, Container, Row, Col } from 'react-bootstrap';
import './BookingForm.css';

const BookingForm = ({ boatData, ownerData, renterData }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedExtras, setSelectedExtras] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [basePrice, setBasePrice] = useState(0);
    const [extrasPrice, setExtrasPrice] = useState(0);
    const dispatch = useDispatch();
    const [showExtras, setShowExtras] = useState(false);

    useEffect(() => {
        const calculateBasePrice = () => {
            const startDateObj = new Date(startDate);
            const endDateObj = new Date(endDate);
            let basePriceCalc = boatData.pricing.referencePrice;
        
            for (const period of boatData.pricing.pricePeriods) {
                const periodStart = new Date(period.fromDate);
                const periodEnd = new Date(period.toDate);
        
                if (startDateObj <= periodEnd && endDateObj >= periodStart) {
                    basePriceCalc = period.price;
                    break;
                }
            }
        
            return basePriceCalc;
        };
    
        const calculateNumberOfDays = () => {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const timeDiff = end - start;
            return timeDiff >= 0 ? Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1 : 0;
        };
    
        const numberOfDays = calculateNumberOfDays();
    
        const basePriceCalc = calculateBasePrice() * numberOfDays;
        
        const extrasPriceCalc = selectedExtras.reduce((acc, extraId) => {
            const extra = boatData.extras.find(e => e._id === extraId);
            return extra ? acc + (Number(extra.pricePerDay) * numberOfDays) : acc;
        }, 0);
    
        setBasePrice(basePriceCalc);
        setExtrasPrice(extrasPriceCalc);
        setTotalPrice(basePriceCalc + extrasPriceCalc);
    }, [startDate, endDate, selectedExtras, boatData]);

    const handleExtrasChange = (extraId) => {
        setSelectedExtras(prevSelectedExtras => 
            prevSelectedExtras.includes(extraId)
            ? prevSelectedExtras.filter(id => id !== extraId)
            : [...prevSelectedExtras, extraId]
        );
    };

    const toggleExtras = () => setShowExtras(!showExtras);

    const handleMakeReservation = () => {
        const userStartDate = new Date(startDate);
        const userEndDate = new Date(endDate);
    
        const unavailablePeriods = boatData.availability 
                                    ? boatData.availability.filter(period => period.isBooked)
                                    : [];
    
        const isUnavailable = unavailablePeriods.some(period => {
            const periodStartDate = new Date(period.startDate);
            const periodEndDate = new Date(period.endDate);
            return (userStartDate <= periodEndDate && userStartDate >= periodStartDate) ||
                   (userEndDate <= periodEndDate && userEndDate >= periodStartDate) ||
                   (userStartDate <= periodStartDate && userEndDate >= periodEndDate);
        });
    
        if (isUnavailable) {
            alert('Selected dates are unavailable. Please choose different dates.');
            return;
        }
    
        const bookingData = {
            boatId: boatData._id,
            renterId: renterData._id,
            startDate,
            endDate,
            extras: selectedExtras.map(extraId => 
                boatData.extras.find(extra => extra._id === extraId)
            ),
            priceDetails: {
                basePrice,
                extrasPrice,
                totalPrice: basePrice + extrasPrice
            },
            contactInfo: {
                renter: {
                    email: renterData.email,
                    phone: renterData.profile.contact.phone
                },
                owner: {
                    email: ownerData.email,
                    phone: ownerData.phone
                }
            },
            cancellationPolicy: boatData.booking.cancellationConditions,
            checkInTime: boatData.booking.checkInTime,
            checkOutTime: boatData.booking.checkOutTime
        };
        dispatch(createBooking(bookingData));
    };

    const handleCheckAvailability = () => {
        const unavailablePeriods = boatData.availability 
                                    ? boatData.availability.filter(period => period.isBooked)
                                    : [];
        let availabilityMessage = "The boat is available for booking.";
    
        if (unavailablePeriods.length > 0) {
            availabilityMessage = "Unavailable Dates:\n" + unavailablePeriods.map(period => 
                `${new Date(period.startDate).toLocaleDateString()} to ${new Date(period.endDate).toLocaleDateString()}`
            ).join('\n');
        }
    };

    const linkStyle = {
        fontFamily: '"Source Sans Pro", sans-serif',
        color: '#34495e',
        fontWeight: 'bold' 
    };

    const textStyle = {
        fontFamily: '"Source Sans Pro", sans-serif',
        fontWeight: 'bold' 
    };
 

    return (
        <Container fluid>
            <Row className="my-4 custom-style-booking-form">
                <Col lg={12}>
                    <Card>
                        <Card.Header as="h2" style={linkStyle}>Make a Reservation</Card.Header>
                        <Card.Body>
                            <Form>
                            <Form.Group controlId="startDate">
                                    <Form.Label style={linkStyle}>Start Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={startDate}
                                        onChange={e => {
                                            if (!endDate || e.target.value <= endDate) {
                                                setStartDate(e.target.value);
                                            }
                                        }}
                                    />
                                </Form.Group>

                                <Form.Group controlId="endDate">
                                    <Form.Label style={linkStyle}>End Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={endDate}
                                        onChange={e => {
                                            if (!startDate || e.target.value >= startDate) {
                                                setEndDate(e.target.value);
                                            }
                                        }}
                                    />
                                </Form.Group>

                                <hr></hr>

                                <Button onClick={toggleExtras} className="toggle-extras-button mb-3" style={textStyle}>
                                    {showExtras ? 'Hide Extras' : 'Choose Extras'}
                                </Button>
                                
                                {showExtras && (
                                    <>
                                        <hr />
                                        <div className="extras-checkboxes">
                                            {boatData.extras.map(extra => (
                                                <Form.Check 
                                                    type="checkbox"
                                                    id={`extra-${extra._id}`}
                                                    label={`${extra.option} - ${extra.pricePerDay}`}
                                                    checked={selectedExtras.includes(extra._id)}
                                                    onChange={() => handleExtrasChange(extra._id)}
                                                    key={extra._id}
                                                    style={linkStyle}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}

                                <hr />

                                <ListGroup variant="center">
                                    <ListGroup.Item style={linkStyle}>
                                        <strong>Total Price:</strong> {totalPrice},00€
                                    </ListGroup.Item>
                                </ListGroup>

                                <Button variant="primary" onClick={handleMakeReservation} style={textStyle}>
                                    Make Reservation
                                </Button>
                                <Button variant="primary" onClick={handleCheckAvailability} className="ml-2" style={textStyle}>
                                    Check Availability
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default BookingForm;