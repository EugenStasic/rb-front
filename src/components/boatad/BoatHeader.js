import React, { useState } from 'react';
import './BoatHeader.css'; 

const BoatHeader = ({ boatData }) => {
  const { type, manufacturer, model, cityHarbour, images } = boatData;
  const [selectedImage, setSelectedImage] = useState(images[0])

  const arrayBufferToBase64 = buffer => {
    let binary = '';
    const bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach(b => binary += String.fromCharCode(b));
    return window.btoa(binary);
  };

  const linkStyle = {
    fontFamily: '"Source Sans Pro", sans-serif',
    color: '#34495e',
    fontWeight: 'bold' 
};
  
  return (
    <div className='custom-header'>
      <h1 className="text-center mb-3" style={linkStyle}>Rent a boat in {cityHarbour.city}, {type}: {manufacturer} {model}</h1>
      <div className="image-display-area">
        <div className="main-image-container">
          <img
            className="main-image"
            src={`data:image/png;base64,${arrayBufferToBase64(selectedImage.data.data)}`}
            alt="Selected"
          />
        </div>
        <div className="thumbnail-container">
          {images.map((img, index) => (
            <img
              key={index}
              className={`thumbnail ${img === selectedImage ? 'active' : ''}`}
              src={`data:image/png;base64,${arrayBufferToBase64(img.data.data)}`}
              alt={`Thumbnail ${index}`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoatHeader;