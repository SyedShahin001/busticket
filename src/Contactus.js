// ContactUs.js

import React from 'react';
import './Contactus.css'; // Import the CSS file for styling
import { FaEnvelope, FaPhone } from 'react-icons/fa'; // Import icons from react-icons library

const Contactus = () => {
  return (
    <div className="contact-us-container">
      <h1 className="contact-heading">Contact Us</h1>
      <hr className="divider" />
      <div className="contact-details">
        <p>
          For any inquiries or assistance, please feel free to reach out to us:
        </p>
        <ul className="contact-list">
          <li>
            <FaEnvelope className="contact-icon" />
            <span>Email:</span> support@redbus.com
          </li>
          <li>
            <FaPhone className="contact-icon" />
            <span>Phone:</span> 1-800-RED-BUS (1-800-733-287)
          </li>
          {/* Add more contact information as needed */}
        </ul>
      </div>
    </div>
  );
};

export default Contactus;
