// ContactUs.js

import React from 'react';
import './Contactus.css'; // Create a separate CSS file for styling

const Contactus = () => {
  return (
    <div className="contact-us-container">
      <h1>Contact Us</h1>
      <hr className="divider" />
      <div className="contact-details">
        <p>
          For any inquiries or assistance, please feel free to reach out to us:
        </p>
        <ul>
          <li>Email: support@redbus.com</li>
          <li>Phone: 1-800-RED-BUS (1-800-733-287)</li>
          {/* Add more contact information as needed */}
        </ul>
      </div>
    </div>
  );
};

export default Contactus;
