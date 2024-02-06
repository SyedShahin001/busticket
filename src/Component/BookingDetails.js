import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookingDetails = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [error, setError] = useState(null);
  const [searchBusName, setSearchBusName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7127/api/Bookings');
        setBookings(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter bookings based on the entered bus name
    const filteredBookings = bookings.filter(booking =>
      booking.busName.toLowerCase().includes(searchBusName.toLowerCase())
    );
    setFilteredBookings(filteredBookings);
  }, [searchBusName, bookings]);

  return (
    <div style={pageContainerStyle}>
      <div style={searchBoxContainer}>
        <label>
          <b>Bus Name:</b>&nbsp;&nbsp;&nbsp;&nbsp;
          <input type="text" value={searchBusName} onChange={(e) => setSearchBusName(e.target.value)} />
        </label>
      </div>
      {error && <p>Error: {error}</p>}
      {filteredBookings.length === 0 ? (
        <p>No matching bookings found.</p>
      ) : (
        <div style={cardContainerStyle}>
          {filteredBookings.map((booking) => (
            <div key={booking.bookingId} style={cardStyle}>
              <h3>{booking.busName}</h3>
              <p><strong>Booking ID:</strong> {booking.bookingId}</p>
              <p><strong>Cust Email:</strong> {booking.email}</p>
              {/* <p><strong>Selected Seats:</strong> {booking.selectedSeats}</p> */}
              <p><strong>Booking Time:</strong> {new Date(booking.bookingTime).toLocaleString()}</p>
              <p><strong>Number of Seats:</strong> {booking.noOfSeats}</p>
              <p><strong>Total Fare:</strong> {booking.totalFare}</p>
              <p><strong>Status:</strong> {booking.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const pageContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const searchBoxContainer = {
  marginBottom: '20px',
  marginTop: '10px',
  marginLeft: '20px',
};

const cardContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',  // Align cards with proper spacing
};

const cardStyle = {
  width: '30%',  // Adjust card width to fit three cards in a row
  boxSizing: 'border-box',
  border: '1px solid #ddd',
  padding: '20px',
  margin: '10px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

export default BookingDetails;