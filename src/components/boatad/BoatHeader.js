import React from 'react';

const BoatHeader = ({ boatData }) => {
  const { type, manufacturer, model, cityHarbour } = boatData;

  return (
    <div>
      <h1>Rent a boat in {cityHarbour.city},  {type}: {manufacturer} {model}</h1>
    </div>
  );
};

export default BoatHeader;