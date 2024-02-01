// BusDetails.js

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { FaBus } from 'react-icons/fa';
import { FaCalendarCheck } from 'react-icons/fa';
import { FaMoneyBillAlt } from 'react-icons/fa';

const BusDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchResults = location.state.searchResults;

  const formatDateTime = (dateTimeString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    return new Date(dateTimeString).toLocaleString('en-US', options);
  };

  const handleBusClick = (source, destination, fare, seatPrice) => {
    // Navigate to BusLayout page and pass the details as state
    navigate('/buslayout', { state: { source, destination, fare, seatPrice } });
  };

  return (
    <>
      {searchResults && searchResults.length > 0 ? (
        searchResults.map((bus) => (
          <Card key={bus.id} border="primary" className="mx-auto" style={{ margin: '10px', maxWidth: '70vw', cursor: 'pointer' }} onClick={() => handleBusClick(bus.source, bus.destination, bus.fare, bus.seatPrice)}>
            <Card.Header className="text-center" style={{ background: 'rgb(200, 0, 0)', color: 'white', border: '2px solid red', borderRadius: '5px' }}>
              <h1>Bus Name: {bus.busName}</h1>
            </Card.Header>
            <Card.Body>
              <div>
                <strong>Source <FaBus /> :</strong> {bus.source}
              </div>
              <div>
                <strong>Destination <FaBus /> :</strong> {bus.destination}
              </div>
              <div>
                <strong>Bus Number:</strong> {bus.busNumber}
              </div>
              <div>
                <strong>Date & Departure Time <FaCalendarCheck /> :</strong> {formatDateTime(bus.departureTime)}
              </div>
              <div>
                <strong>Category:</strong> {bus.category}
              </div>
              <div>
                <strong>Fare <FaMoneyBillAlt /> :</strong> {bus.fare}
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
