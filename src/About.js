// About.js

import React from 'react';
import './About.css'; // Create a separate CSS file for styling

const About = () => {
  const faqData = [
    {
      question: "What is redBus?",
      answer: "redBus is India's largest brand for online bus ticket booking.",
      
    },
    {
      question: "Why book with redBus?",
      answer: "Booking with redBus offers an easy-to-use online bus ticket and train ticket booking service.",
    },
    {
      question:"Who is the founder of redBus?",
      answer: "redBus was founded in 2006 by Phanindra Sama, Sudhakar Pasupunuri and Charan Padmaraju, engineers from the Birla Institute of Technology and Science , who also worked together at various organisations",
    },
    {
      question:"Can we book a private bus on Redbus?",
      answer:"Yes, We can book a private bus in Redbus",
    },
    // Add more FAQ items as needed
  ];

  return (
    <div className="about-container">
      <h3>About Us</h3>
      <div className="text-outline">
        <p>
          BOOK BUS TICKETS ONLINE
          redBus is India's largest brand for online bus ticket booking and offers an easy-to-use online bus ticket and train ticket booking service, With over 36 million satisfied customers, 3500+ bus operators to choose from, and plenty of offers on bus ticket booking, redBus makes road journeys super convenient for travelers. A leading platform for booking bus tickets, redBus has been the leader in online bus booking over the past 17 years across thousands of cities and lakhs of routes in India.
        </p>
        <p>
          Booking a bus ticket online on redBus app or website is very simple. You can download the redBus app or visit redbus.in and enter your source, destination & travel date to check the top-rated bus services available. You can then compare prices, ratings & amenities, select your preferred seat, boarding & dropping points and make the payment using multiple payment options like UPI, debit or credit card, net banking and more. With redBus you can be assured of safe & secure payment methods and guaranteed travel with the best seat and bus.
        </p>
      </div>
      <br />
      <h1>Frequently Asked Questions</h1>
      <div className="faq-container">
        {faqData.map((item, index) => (
          <div key={index} className="faq-item">
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
