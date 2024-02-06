// PaymentPage.js
import { useLocation, useNavigate } from 'react-router-dom';
import { FaRupeeSign } from 'react-icons/fa';
import { CLIENT_ID } from '../Config/Config';
import React, { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import emailjs from '@emailjs/browser'

const PaymentPage = () => {
  const location = useLocation();
  const { busid, source, destination, fare, selectedSeats, totalFair } = location.state;
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState('');
  const [orderID, setOrderID] = useState(false);
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const name = localStorage.getItem("name");

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: totalFair,
          },
        },
      ],
    }).then((orderID) => {
      setOrderID(orderID);
      return orderID;
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      setSuccess(true);
    });
  };

  const onError = (data, actions) => {
    setErrorMessage('An Error occurred with your payment');
  };

  


  const handleProceedToPay = async () => {
    const apiUrl = 'https://localhost:7127/api/Bookings';
    const currentDateTime = new Date().toISOString();

    const requestBody = {
      busId: busid, // Replace with actual busId
      signupId: localStorage.getItem('signupid'), // Replace with actual signupId
      selectedSeat: selectedSeats.join(', '), // Combine selected seats
      bookingTime: currentDateTime,
      numberOfSeats: selectedSeats.length,
      totalFare: totalFair,
      status: 'booked',
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        setShow(true);
      } else {
        console.error('Failed to create booking. Please try again.');
      }
    } catch (error) {
      console.error('Error while making the API request:', error);
    }
  };

  useEffect(() => {
    if (success) {
      alert('Payment successful!!');
      console.log('Order successful. Your order id is--', orderID);
      navigate('/Paymentsuccess');
      const serviceId = "service_navsav5";
      const templateId = "template_n68mdz9";
      const publicKey = "4XVtb_PHYibbHtazg";
    console.log(email);
    const templateParams = {
      from_name :"Shahin(Admin)",
      to_email:email,
      to_name: name,
      message: `Hi, Your booking details are as follows:\nSource: ${source}\nDestination: ${destination}\nFare: ${fare}\nSelected Seats: ${selectedSeats.join(', ')}\nTotal Fare: ${totalFair}\n\nThank you for booking with us!`,
    };
    emailjs.send(serviceId,templateId,templateParams,publicKey)
    .then(()=>{
      alert("Email sent successfully");
    })
    .catch((emailerror)=>{
alert("Error in sending email");
    });
    }
  }, [success]);

  return (
    <div style={styles}>
    <PayPalScriptProvider options={{ 'client-id': CLIENT_ID }}>
      <div className="payment-container">
        <h1 style={{ textAlign: 'center', fontSize: '2em' }}>Payment Details</h1>
        <div className="details" style={{ textAlign: 'center', fontSize: '1.5em' }}>

          <p> 
            <b>Source:</b> {source} <br />
            <b>Destination:</b> {destination} <br />
            <b>Fare:</b> <FaRupeeSign />
            {fare} <br />
          </p>
          <p>
            <b>Selected Seat Numbers:</b> {selectedSeats.join(', ')} <br />
            <b>Total Fare:</b> <FaRupeeSign />
            {totalFair} <br />
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
  <button className='buy-btn' type="submit" onClick={handleProceedToPay}>Proceed to Pay</button>
  <button className='btn-danger' onClick={() => navigate("/Landingpage")}>Cancel to Pay</button>
</div>



<br></br>

        {show ? (
          <PayPalButtons
            style={{ layout: 'vertical' }}
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
          />
        ) : null}
      </div>
    </PayPalScriptProvider>
    </div>
  );
};

const styles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh', // Optionally, you can set the height of the container to the full viewport height
  width:'100vw',


};



export default PaymentPage;


