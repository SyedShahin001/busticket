// BusDetails.js

import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { FaBus } from 'react-icons/fa';
import { FaCalendarCheck } from 'react-icons/fa';
import { FaMoneyBillAlt } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom'; 
// import Home from './Home';

const BusDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const searchResults = location.state.searchResults;

  useEffect(() => {
    const logged = localStorage.getItem("log");
    setIsLoggedIn(logged === "true");
  }, []);

  const formatDateTime = (dateTimeString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    return new Date(dateTimeString).toLocaleString('en-US', options);
  };

  const handleBusClick = (busid,source, destination, fare, seatPrice) => {
    if (isLoggedIn) {
      // Navigate to BusLayout page and pass the details as state
      navigate('/buslayout', { state: { busid,source, destination, fare, seatPrice } });
    } else {
      // Display a message or perform any other action for non-logged-in users
      alert('Please log in first to view bus details.');
      // You can also redirect to the login page if needed
      // navigate('/login');
    }
  };

  return (
    <> 
    {/* <Home /> */}
      {searchResults && searchResults.length > 0 ? (
        searchResults.map((bus) => (
          <Card key={bus.id} border="primary" className="mx-auto" style={{ margin: '10px', maxWidth: '70vw', cursor: 'pointer', height: 'fit-content' }} onClick={() => handleBusClick(bus.busId, bus.source, bus.destination, bus.fare, bus.seatPrice)}>
            <Card.Header className="text-center" style={{ background: 'grey', color: 'white', border: '2px solid grey', borderRadius: '5px' }}>
              <h1>Bus Name: {bus.busName}</h1>
            </Card.Header>
            <Card.Body>
              <div style={{paddingLeft:290}}>
                <strong>Source <FaBus /> :</strong> {bus.source}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <strong>Destination <FaBus /> :</strong> {bus.destination}
              </div>
              <div style={{paddingLeft:290}}>
                <strong>Bus Number:</strong> {bus.busNumber}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <strong>Category:</strong> {bus.category}
              </div>
              <div style={{paddingLeft:220}}>
                <strong>Date & Departure Time <FaCalendarCheck /> :</strong> {formatDateTime(bus.departureTime)}
              </div>
              <div style={{paddingLeft:770}}>
                <h5>Fare <FaMoneyBillAlt /> : {bus.fare}</h5>
              </div>
            </Card.Body>
          </Card>
        ))
      ) : (
        <Card border="primary" className="mx-auto" style={{ margin: '10px', maxWidth: '70vw' }}>
          <Card.Body>
            <p>No matching buses found.</p>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default BusDetails;