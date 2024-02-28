import React from 'react';
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>&copy; {new Date().getFullYear()} BoatApp. All Rights Reserved.</p>
        <p>
          <a href="/privacy-policy" className={styles.footerLink}>
            Privacy Policy
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;