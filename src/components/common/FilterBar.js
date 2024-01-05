import React, { useState, useEffect } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { fetchLocations } from '../../services/search/searchService';
import { Range } from 'react-range';
import './FilterBar.css';

const FilterBar = ({ onFilterChange }) => {
    const [filters, setFilters] = useState({
        price: [0, 10000],
        length: [0, 1000],
        power: [0, 1000],
        location: '',
        type: '',
        engineType: '',
        yearOfConstruction: { min: 1900, max: new Date().getFullYear() },
        availability: { startDate: '', endDate: '' }
    });

    const resetFilters = () => {
        setFilters({
            price: [0, 10000],
            length: [0, 1000],
            power: [0, 1000],
            location: '',
            type: '',
            engineType: '',
            availability: { startDate: '', endDate: '' }
        });
    };

    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const loadLocations = async () => {
            try {
                const locationsData = await fetchLocations();
                setLocations(locationsData);
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };

        loadLocations();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('availability.')) {
            const key = name.split('.')[1];
            setFilters(prevFilters => ({
                ...prevFilters,
                availability: {
                    ...prevFilters.availability,
                    [key]: value
                }
            }));
        } else {
            setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
        }
    };

    const handleRangeChange = (name, values) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: values
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedFilters = {
            price: { min: filters.price[0], max: filters.price[1] },
            length: { min: filters.length[0], max: filters.length[1] },
            power: { min: filters.power[0], max: filters.power[1] },
            location: filters.location,
            type: filters.type,
            engineType: filters.engineType,
            availability: {
                startDate: filters.availability.startDate,
                endDate: filters.availability.endDate
            }
        };
        onFilterChange(formattedFilters);
    };

    const renderRangeTrack = (name, min, max, values) => ({ props, children }) => {
        const percentageStart = (values[0] - min) / (max - min) * 100;
        const percentageEnd = (values[1] - min) / (max - min) * 100;

        return (
            <div {...props} className="react-range-track" style={{...props.style}}>
                <div className="react-range-track-background" />
                <div
                    className="react-range-track-active"
                    style={{
                        left: `${percentageStart}%`,
                        width: `${percentageEnd - percentageStart}%`,
                    }}
                />
                {children}
            </div>
        );
    };

    const textStyle = {
        color: '#2c3e50',
    };

    const labelStyle = {
        ...textStyle,
        fontWeight: 'bold', 
    };

    const formControlStyle = {
        backgroundColor: 'white', 
        borderColor: '#bdc3c7', 
        color: '#2c3e50', 
    };

    const buttonStyle = {
        backgroundColor: ' #007bff', 
        borderColor: '#2980b9', 
        color: 'white', 
    };

    const resetButtonStyle = {
        backgroundColor: ' #007bff', 
        borderColor: '#7f8c8d', 
        color: 'white', 
    };

    return (
        <Container className="sidebar p-3" style={{ background: '#ecf0f1' }} >
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Col>
                        <Form.Label style={labelStyle}>Boat Type</Form.Label>
                        <Form.Select name="type" value={filters.type} onChange={handleInputChange}>
                            <option value="">All Types</option>
                            <option value="Motorboat">Motorboat</option>
                            <option value="Sailboat">Sailboat</option>
                            <option value="RIB">RIB</option>
                            <option value="Catamaran">Catamaran</option>
                            <option value="Jet-Ski">Jet-Ski</option>
                            <option value="Yacht">Yacht</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                    <Form.Label style={labelStyle}>Location</Form.Label>
                        <Form.Select name="location" value={filters.location} onChange={handleInputChange}>
                            <option value="">All Locations</option>
                            {locations.map(location => (
                                <option key={location} value={location}>{location}</option>
                            ))}
                        </Form.Select>
                    </Col>
                </Row>
    
                <Row className="mb-3">
                    <Col>
                    <Form.Label style={labelStyle}>Engine Type</Form.Label>
                        <Form.Select name="engineType" value={filters.engineType} onChange={handleInputChange}>
                            <option value="">All Types</option>
                            <option value="Inboard">Inboard</option>
                            <option value="Outboard">Outboard</option>
                        </Form.Select>
                    </Col>
                </Row>
    
                <Row className="mb-3">
                    <Col>
                    <Form.Label style={labelStyle}>Availability From</Form.Label>
                        <Form.Control type="date" name="availability.startDate" value={filters.availability.startDate} onChange={handleInputChange} />
                    </Col>
                    <Col>
                    <Form.Label style={labelStyle}>To</Form.Label>
                        <Form.Control type="date" name="availability.endDate" value={filters.availability.endDate} onChange={handleInputChange} />
                    </Col>
                </Row>
    
                {/* Price Range Slider */}
                <Row className="mb-3">
                    <Col>
                        <Form.Label style={labelStyle}>Price (€)</Form.Label>
                        <Range
                            step={1}
                            min={0}
                            max={10000}
                            values={filters.price}
                            onChange={(values) => handleRangeChange('price', values)}
                            renderTrack={renderRangeTrack('price', 0, 10000, filters.price)}
                            renderThumb={({ props }) => (
                                <div {...props} className="react-range-thumb"/>
                            )}
                        />
                        <div className="text-center" style={textStyle}>
                            {filters.price[0]},00€ - {filters.price[1]},00€
                        </div>
                    </Col>
                </Row>
    
                {/* Length Range Slider */}
                <Row className="mb-3">
                    <Col>
                        <Form.Label style={labelStyle}>Length (m)</Form.Label>
                        <Range
                            step={1}
                            min={0}
                            max={1000}
                            values={filters.length}
                            onChange={(values) => handleRangeChange('length', values)}
                            renderTrack={renderRangeTrack('length', 0, 1000, filters.length)}
                            renderThumb={({ props }) => (
                                <div {...props} className="react-range-thumb"/>
                            )}
                        />
                        <div className="text-center" style={textStyle}>
                            {filters.length[0]}m - {filters.length[1]}m
                        </div>
                    </Col>
                </Row>

                {/* Power Range Slider */}
                <Row className="mb-3">
                    <Col>
                        <Form.Label style={labelStyle}>Power (HP)</Form.Label>
                        <Range
                            step={1}
                            min={0}
                            max={1000}
                            values={filters.power}
                            onChange={(values) => handleRangeChange('power', values)}
                            renderTrack={renderRangeTrack('power', 0, 1000, filters.power)}
                            renderThumb={({ props }) => (
                                <div {...props} className="react-range-thumb"/>
                            )}
                        />
                        <div className="text-center" style={textStyle}>
                            {filters.power[0]} HP - {filters.power[1]} HP
                        </div>
                    </Col>
                </Row>
    
                <Row className="mb-3">
                    <Col>
                        <Button type="submit" className="btn btn-primary w-100" style={buttonStyle}>Apply Filters</Button>
                    </Col>
                    <Col>
                        <Button variant="secondary" className="w-100" onClick={resetFilters} style={resetButtonStyle}>Reset Filters</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}

export default FilterBar;