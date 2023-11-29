import React from 'react';

const BoatDetails = ({ boatData, ownerData }) => {
    const {
        manufacturer,
        model,
        onboardCapacity,
        boatLength,
        enginePower,
        description,
        engineType,
        boatLicenseRequierment,
        cancellationConditions,
        checkInTime,
        checkOutTime,
        fuelCost,
        equipment,
     } = boatData;

     const ownerName = ownerData ? ownerData.firstName : 'Loading owner...';

     return (
        <div>
            <div>
                <h2>Boat Offerd by { ownerName }</h2>
                <p>Capacity: { onboardCapacity } --- Power: { enginePower }HP --- Length: { boatLength }</p>
            </div>
            <div>
                <h2>Description of { ownerName }'s Boat</h2>
                <p>{ description }</p>
            </div>
            <div>
                <h2>Boat's Technical Information</h2>
                <p>Manufacturer: { manufacturer } --- Model: { model }</p>
                <p>Engine Type: { engineType } --- Engine Power: { enginePower }</p>
                <p>Boat Length: { boatLength } --- Maximum onboard Capacity: { onboardCapacity } </p>
            </div>
            <div>
                <h2>Charter Rules</h2>
                <p>License Requierment: { boatLicenseRequierment }  --- Cancellation contiditions: { cancellationConditions }</p>
                <p>Check in time: { checkInTime } --- Check out time: { checkOutTime }</p>
                <p>Fuel Cost: { fuelCost }</p>
            </div>
            <div>
                <h2>Boat's equipment</h2>
                <p>Navigation Equipment</p>
                <ul>
                    {equipment.navigationEquipment.map((item, index) => (
                        <li key={`nav-${index}`}>{ item }</li>
                    ))}
                </ul>
                <p>Boat Equipment</p>
                <ul>
                    {equipment.boatEquipment.map((item, index) => (
                        <li key={`boat-${index}`}>{ item }</li>
                    ))}
                </ul>
                <p>Water Sports</p>
                <ul>
                    {equipment.waterSportsEquipment.map((item, index) => (
                        <li key={`water-${index}`}>{ item }</li>
                    ))}
                </ul>
            </div>
        </div>
     )
};

export default BoatDetails;