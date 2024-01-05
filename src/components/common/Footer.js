import React from 'react';
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} BoatApp. All Rights Reserved.</p>
        <p>
          <a href="/privacy-policy">Privacy Policy</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;