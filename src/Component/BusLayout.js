import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BusLayout.css';
import { GiSteeringWheel } from "react-icons/gi";

const BusLayout = () => {
  const totalRows = 4;
  const seatsPerRow = 4;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalFair, setTotalFair] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  // Destructure details from state
  const { source, destination, fare, departureTime, seatPrice } = location.state;

  const calculateSeatNumber = (row, seat) => {
    return (row - 1) * seatsPerRow + seat;
  };

  const handleSeatClick = (row, seat) => {
    const seatNumber = calculateSeatNumber(row, seat);

    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((selectedSeat) => selectedSeat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
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

  return (
    <div className="bus-layout-container">
      {/* Left side: Bus Layout */}
      <div className="left-side">
      <GiSteeringWheel />
        {Array.from({ length: totalRows }, (_, rowIndex) => (
          <div key={rowIndex} className="bus-layout-row">
            {Array.from({ length: seatsPerRow }, (_, seatIndex) => {
              const seatNumber = calculateSeatNumber(rowIndex + 1, seatIndex + 1);
              const isSeatSelected = selectedSeats.includes(seatNumber);

              return (
                <div
                  key={seatIndex}
                  className={`bus-layout-seat ${isSeatSelected ? 'selected' : ''}`}
                  onClick={() => handleSeatClick(rowIndex + 1, seatIndex + 1)}
                >
                  {seatNumber}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Right side: Other Details */}
      <div className="right-side">
        <p>
          Source: {source},<br />

          Destination: {destination},<br />
          Fare: ${fare}<br />
        </p>
        <p>Selected Seats: {selectedSeats.join(', ')}</p>
        <p>Total Fare: {totalFair}</p>
        <button onClick={() => navigate('/payment')}>Book Now</button>
      </div>
    </div>
  );
};

export default BusLayout;










