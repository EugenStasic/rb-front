import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBooking } from '../../../actions/bookingActions';

const BookingForm = ({ boatData, ownerData, renterData }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedExtras, setSelectedExtras] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        const calculateBasePrice = () => {
            const startDateObj = new Date(startDate);
            const endDateObj = new Date(endDate);
            let basePrice = boatData.pricing.referencePrice;
        
            for (const period of boatData.pricing.pricePeriods) {
                const periodStart = new Date(period.fromDate);
                const periodEnd = new Date(period.toDate);
        
                if (startDateObj <= periodEnd && endDateObj >= periodStart) {
                    basePrice = period.price;
                    break;
                }
            }
        
            return basePrice;
        };

        const calculateNumberOfDays = () => {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const timeDiff = end - start;
            return timeDiff >= 0 ? Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1 : 0;
        };
    
        const numberOfDays = calculateNumberOfDays();
    
        const basePrice = calculateBasePrice() * numberOfDays;
        
        const extrasPrice = selectedExtras.reduce((acc, extraId) => {
            const extra = boatData.extras.find(e => e._id === extraId);
            return extra ? acc + (Number(extra.pricePerDay) * numberOfDays) : acc;
        }, 0);
    
        setTotalPrice(basePrice + extrasPrice);
    }, [startDate, endDate, selectedExtras, boatData]);

    const handleExtrasChange = (e) => {
        const options = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedExtras(options);
    };

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
            totalPrice,
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

    return (
        <div>
            <h2>Make a Reservation</h2>
            <label>
                Start Date:
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
            </label>

            <label>
                End Date:
                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
            </label>

            <label>
                Extras:
                <select multiple onChange={handleExtrasChange}>
                    {boatData.extras.map(extra => (
                        <option key={extra._id} value={extra._id}>{extra.option}</option>
                    ))}
                </select>
            </label>

            <p>Total Price: {totalPrice}</p>

            <button onClick={handleMakeReservation}>Make Reservation</button>
            <button onClick={handleCheckAvailability}>Check Availability</button>
        </div>
    );
};

export default BookingForm;