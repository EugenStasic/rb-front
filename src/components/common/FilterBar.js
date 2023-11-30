import React, { useState, useEffect } from 'react';
import { fetchLocations } from '../../services/search/searchService';

const FilterBar = ({ onFilterChange }) => {
    const [filters, setFilters] = useState({
        price: { min: 0, max: 10000 }, 
        length: { min: 0, max: 1000 }, 
        power: { min: 0, max: 1000 }, 
        location: ''
    });

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

    const handleSliderChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: { ...prevFilters[name], [e.target.dataset.type]: parseInt(value, 10) }
        }));
    };

    const handleDropdownChange = (e) => {
        setFilters(prevFilters => ({ ...prevFilters, location: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedFilters = {
            price: { min: filters.price.min, max: filters.price.max },
            length: { min: filters.length.min, max: filters.length.max },
            power: { min: filters.power.min, max: filters.power.max },
            location: filters.location
        };
        onFilterChange(formattedFilters);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Price:
                <input type="range" name="price" data-type="min" min="0" max="100000" value={filters.price.min} onChange={handleSliderChange} />
                {filters.price.min}
            </label>
            <label>
                Length:
                <input type="range" name="length" data-type="min" min="0" max="100" value={filters.length.min} onChange={handleSliderChange} />
                {filters.length.min}
            </label>
            <label>
                Power:
                <input type="range" name="power" data-type="min" min="0" max="1000" value={filters.power.min} onChange={handleSliderChange} />
                {filters.power.min}
            </label>
            <label>
                Location:
                <select name="location" value={filters.location} onChange={handleDropdownChange}>
                    <option value="">All Locations</option>
                    {locations.map(location => (
                        <option key={location} value={location}>{location}</option>
                    ))}
                </select>
            </label>
            <button type="submit">Apply Filters</button>
        </form>
    );
};

export default FilterBar;