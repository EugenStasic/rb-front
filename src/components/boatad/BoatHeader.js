import React, { useState } from 'react';
import styles from "./BoatHeader.module.css";
import { arrayBufferToBase64 } from "../../utils/utils";

const BoatHeader = ({ boatData }) => {
  const { type, manufacturer, model, cityHarbour, images } = boatData;
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className={styles.customHeader}>
      <h1 className={`${styles.textCenter} ${styles.mb3}`}>
        Rent a boat in {cityHarbour.city}, {type}: {manufacturer} {model}
      </h1>
      <div className={styles.imageDisplayArea}>
        <div className={styles.mainImageContainer}>
          <img
            className={styles.mainImage}
            src={`data:image/png;base64,${arrayBufferToBase64(
              selectedImage.data.data
            )}`}
            alt="Selected"
          />
        </div>
        <div className={styles.thumbnailContainer}>
          {images.map((img, index) => (
            <img
              key={index}
              className={`${styles.thumbnail} ${
                img === selectedImage ? styles.active : ""
              }`}
              src={`data:image/png;base64,${arrayBufferToBase64(
                img.data.data
              )}`}
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