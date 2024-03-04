import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { FaBus, FaCalendarCheck, FaMoneyBillAlt } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdEventSeat } from "react-icons/md";

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

  const handleBusClick = (busid, source, destination, fare, seatPrice, row, column, busURL) => {
    if (isLoggedIn) {
      // Navigate to BusLayout page and pass the details as state
      navigate('/buslayout', { state: { busid, source, destination, fare, seatPrice, row, column, busURL } });
    } else {
      // Display a message or perform any other action for non-logged-in users
      alert('Please log in first to view bus details.');
      // You can also redirect to the login page if needed
      // navigate('/login');
    }
  };

  return (
    <>
      {searchResults && searchResults.length > 0 ? (
        searchResults.map((bus) => (
          <Card key={bus.id} border="primary" className="mx-auto" style={{ margin: '10px', maxWidth: '90vw', cursor: 'pointer' }} onClick={() => handleBusClick(bus.busId, bus.source, bus.destination, bus.fare, bus.seatPrice, bus.row, bus.column,bus.busURL)}>
            <Card.Header className="text-center" style={{ background: 'grey', color: 'white', border: '2px solid grey', borderRadius: '5px' }}>
              <h1>Bus Name: {bus.busName}</h1>
            </Card.Header>
            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
              <div className="mb-2">
                <strong>Source <FaBus /> :</strong> {bus.source} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <strong className="ml-2">Destination <FaBus /> :</strong> {bus.destination}
              </div>
              <div className="mb-2">
                <strong>Bus Number:</strong> {bus.busNumber} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <strong className="ml-2">Category:</strong> {bus.category}
              </div>
              <div className="mb-2">
                <strong>Date & Departure Time <FaCalendarCheck /> :</strong> {formatDateTime(bus.departureTime)}
              </div>
              <div>
                <h5 className="mt-2">Fare <FaMoneyBillAlt /> : {bus.fare}</h5>
              </div>
              <div>
                <h5 className="mt-2">Available seats<MdEventSeat /> : {bus.availableSeats}</h5>
              </div>
            </Card.Body>
          </Card>
        ))
      ) : (
        <Card border="primary" className="mx-auto" style={{ margin: '10px', maxWidth: '90vw' }}>
          <Card.Body>
            <p>No matching buses found.</p>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default BusDetails;
