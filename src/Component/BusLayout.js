import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BusLayout.css';
import { GiSteeringWheel } from "react-icons/gi";
import { FaArrowRight } from "react-icons/fa6";
import { FaRupeeSign } from "react-icons/fa";

const BusLayout = () => {
  const totalRows = 5;
  const seatsPerRow = 3;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [totalFair, setTotalFair] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  // Destructure details from state
  const { busid, source, destination, fare, departureTime, seatPrice } = location.state;

  const calculateSeatNumber = (row, seat) => {
    return (row - 1) * seatsPerRow + seat;
  };

  const handleSeatClick = (row, seat) => {
    const seatNumber = calculateSeatNumber(row, seat);

    if (!bookedSeats.includes(seatNumber)) {
      if (selectedSeats.includes(seatNumber)) {
        setSelectedSeats(selectedSeats.filter((selectedSeat) => selectedSeat !== seatNumber));
      } else {
        setSelectedSeats([...selectedSeats, seatNumber]);
      }
    }
  };

  const handleBookButtonClick = () => {
    const numberOfSeats = selectedSeats.length;
    const totalPrice = numberOfSeats * fare;
    setTotalFair(totalPrice);
  };

  useEffect(() => {
    handleBookButtonClick();
  }, [selectedSeats]);

  useEffect(() => {
    // Fetch booked seats for the current busId
    fetch(`https://localhost:7127/api/Bookings/block?busId=${busid}`)
      .then(response => response.json())
      .then(data => {
        setBookedSeats(data.map(Number));
      })
      .catch(error => console.error('Error fetching booked seats:', error));
  }, [busid]);

  return (
    <div className="bus-layout-container">
      {/* Left side: Bus Layout */}
      <div className="left-side">
  {/* First section: Bus seat layout */}
  <div className="bus-seat-layout">
    &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;<GiSteeringWheel />  

    <h5>________________________</h5>
    {Array.from({ length: totalRows }, (_, rowIndex) => (
      <div key={rowIndex} className="bus-layout-row">
        {Array.from({ length: seatsPerRow }, (_, seatIndex) => {
          const seatNumber = calculateSeatNumber(rowIndex + 1, seatIndex + 1);
          const isSeatSelected = selectedSeats.includes(seatNumber);
          const isSeatBooked = bookedSeats.includes(seatNumber);

          return (
            <div
              key={seatIndex}
              className={`bus-layout-seat ${isSeatSelected ? 'selected' : ''} ${isSeatBooked ? 'blocked' : ''}`}
              onClick={() => handleSeatClick(rowIndex + 1, seatIndex + 1)}
              style={{ marginRight: seatIndex % 2 === 0 ? '30px' : '0' }}
            >
              {seatNumber}
            </div>
          );
        })}
      </div>
    ))}
  </div>

  {/* Second section: Seat indications */}
  <div className="seat-indications">
    <div className="indication">
      <div>
      <div className="square selected"></div>
      Selected
      </div>
    </div>
    <div className="indication">
      <div className="square blocked"></div>
      <div className="text">Blocked</div>
    </div>
    <div className="indication">
      <div className="square available"></div>
      <div className="text">Available</div>
    </div>
  </div>
</div>

      {/* Right side: Other Details */}
      <div className="right-side">
        <p>
         
         <b> <h1>Source <FaArrowRight/>  Destination<br /> </h1></b>
         <h3> {source} <FaArrowRight/> {destination} <br /> </h3>

         <b>Fare: </b>  <FaRupeeSign/>{fare}<br />
        </p>
        <p><b>Selected Seats:</b> {selectedSeats.join(', ')}</p>
        <p><b>Total Fare: </b> <FaRupeeSign/>{totalFair}</p> 
        {selectedSeats.length!==0 ? 
        <button onClick={() => navigate('/PaymentPage', { state: { busid,source, destination, fare, selectedSeats, totalFair } })}>
  Book Now
</button> : <h1></h1>}
      </div>
    </div>
  );
};

export default BusLayout;
