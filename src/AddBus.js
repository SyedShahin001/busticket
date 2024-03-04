import React, { useState } from 'react';
import axios from 'axios';
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBInput,  MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { MdEventSeat } from "react-icons/md";



const AddBus = () => {
  const [bus, setBus] = useState({
    busNumber: '',
    busName: '',
    busDescription: '',
    busURL: '',
    category: '',
    source: '',
    destination: '',
    departureTime: '',
    arrivalTime: '',
    fare: '',
    availableSeats: '',
    row: '',
    column: '',
    timeToReach: '',
    busAvailability: true,
  });

  const [errors, setErrors] = useState({});
  const [seatLayout, setSeatLayout] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBus((prevBus) => ({ ...prevBus, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: validateField(name, value) }));
  
    if (name === 'arrivalTime' || name === 'departureTime') {
      const arrivalTime = new Date(name === 'arrivalTime' ? value : bus.arrivalTime);
      const departureTime = new Date(name === 'departureTime' ? value : bus.departureTime);
      if (!isNaN(arrivalTime.getTime()) && !isNaN(departureTime.getTime())) {
        const timeToReachInMilliseconds = Math.abs(departureTime - arrivalTime);
        const hours = Math.floor(timeToReachInMilliseconds / (1000 * 60 * 60));
        const minutes = Math.floor((timeToReachInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
        const formattedTimeToReach = `${hours} hours ${minutes} minutes`;
        setBus((prevBus) => ({ ...prevBus, timeToReach: formattedTimeToReach }));
      }
    }
  
    if (name === 'row' || name === 'column') {
      const newRow = name === 'row' ? value : bus.row;
      const newColumn = name === 'column' ? value : bus.column;
  
      if (newRow.trim() !== '' && newColumn.trim() !== '') {
        if (name === 'column' && parseInt(newColumn) > 3) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: 'Columns cannot be greater than 3.',
          }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
          const totalSeats = parseInt(newRow) * parseInt(newColumn);
          setBus((prevBus) => ({ ...prevBus, availableSeats: totalSeats }));
          generateSeatLayout(parseInt(newColumn), parseInt(newRow)); // Switched the parameters
        }
      } else {
        setBus((prevBus) => ({ ...prevBus, availableSeats: '' }));
        setSeatLayout([]);
      }
    }
  };
  

  const generateSeatLayout = (rows, columns) => {
    const layout = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < columns; j++) {
        row.push({ id: `${i}-${j}`, available: true });
      }
      layout.push(row);
    }
    setSeatLayout(layout);
  };

  const validateField = (name, value) => {
    if (!value.trim()) {
      return `${name} is required.`;
    }
    return '';
  };

  const validateForm = () => {
    const newErrors = {};

    if (!bus.busNumber) newErrors.busNumber = 'Bus Number is required.';
    if (!bus.busName) newErrors.busName = 'Bus Name is required.';
    if (!bus.busDescription) newErrors.busDescription = 'Bus Description is required.';
    if (!bus.category) newErrors.category = 'Bus Category is required.';
    if (!bus.source) newErrors.source = 'Source is required.';
    if (!bus.destination) newErrors.destination = 'Destination is required.';
    if (!bus.arrivalTime) newErrors.arrivalTime = 'Arrival Time is required.';
    if (!bus.departureTime) newErrors.departureTime = 'Departure Time is required.';
    if (bus.fare <= 0) newErrors.fare = 'Fare should be greater than 0.';
    if (!bus.availableSeats) newErrors.availableSeats = 'Available Seats is required.';
    if (!bus.row) newErrors.row = 'Rows is required.';
    if (!bus.column) newErrors.column = 'Columns is required.';
    if (!bus.busURL) newErrors.column = 'Bus URL is is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await axios.post('http://localhost:88/api/Buses', bus); 
      console.log("bus data",bus);
      const newBusData = response.data;
      console.log('New Bus Data:', newBusData);
      setBus({
        busNumber: '',
        busName: '',
        busDescription: '',
        busURL: '',
        category: '',
        source: '',
        destination: '',
        departureTime: '',
        arrivalTime: '',
        fare: '',
        availableSeats: '',
        row: '',
        column: '',
        timeToReach: '',
        busAvailability: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fieldStyle = {
    marginBottom: '15px',
  };

  const errorStyle = {
    color: 'red',
  };

  return (
    <MDBContainer className='my-5'>
     <h1 style={{ color: 'grey', textAlign: 'center' }}>Add your Buses here</h1>
      <MDBCard>
        <MDBCardBody>
          <form onSubmit={handleSubmit}>
            <div style={fieldStyle}>
              <MDBInput
                wrapperClass='mb-4'
                label='Bus Number'
                name='busNumber'
                value={bus.busNumber}
                onChange={handleInputChange}
              />
              {errors.busNumber && <span style={errorStyle}>{errors.busNumber}</span>}
            </div>

            <div style={fieldStyle}>
              <MDBInput
                wrapperClass='mb-4'
                label='Bus Name'
                name='busName'
                value={bus.busName}
                onChange={handleInputChange}
              />
              {errors.busName && <span style={errorStyle}>{errors.busName}</span>}
            </div>

            <div style={fieldStyle}>
              <MDBInput
                wrapperClass='mb-4'
                label='Bus Description'
                name='busDescription'
                value={bus.busDescription}
                onChange={handleInputChange}
              />
              {errors.busDescription && <span style={errorStyle}>{errors.busDescription}</span>}
            </div>

            <div style={fieldStyle}>
              <label>Bus Category:</label>
              <select
                className='form-select mb-4'
                name='category'
                value={bus.category}
                onChange={handleInputChange}
              >
                <option value='' disabled>Select</option>
                <option value='AC'>AC</option>
                <option value='Non-AC'>Non-AC</option>
              </select>
              {errors.category && <span style={errorStyle}>{errors.category}</span>}
            </div>

            <div style={fieldStyle}>
              <MDBInput
                wrapperClass='mb-4'
                label='Source'
                name='source'
                value={bus.source}
                onChange={handleInputChange}
              />
              {errors.source && <span style={errorStyle}>{errors.source}</span>}
            </div>

            <div style={fieldStyle}>
              <MDBInput
                wrapperClass='mb-4'
                label='Destination'
                name='destination'
                value={bus.destination}
                onChange={handleInputChange}
              />
              {errors.destination && <span style={errorStyle}>{errors.destination}</span>}
            </div>

{/* <div style={fieldStyle}>
  <label htmlFor="source" className="form-label">Source</label>
  <select
    id="source"
    name="source"
    value={bus.source}
    onChange={handleInputChange}
    className="form-select"
  >
    <option value="" disabled>Select</option>
    <option value="Chennai">Chennai</option>
    <option value="Delhi">Delhi</option>
    <option value="Hyderabad<">Hyderabad</option>
    <option value="Pune">Pune</option>
    <option value="Mumbai">Mumbai</option>
  </select>
  {errors.source && <span style={errorStyle}>{errors.source}</span>}
</div>

<div style={fieldStyle}>
  <label htmlFor="destination" className="form-label">Destination</label>
  <select
    id="destination"
    name="destination"
    value={bus.destination}
    onChange={handleInputChange}
    className="form-select"
  >
    <option value="" disabled>Select</option>
    <option value="Pune">Chennai</option>
    <option value="Delhi">Delhi</option>
  </select>
  {errors.destination && <span style={errorStyle}>{errors.destination}</span>}
</div> */}


            <div style={fieldStyle}>
              <MDBInput
                wrapperClass='mb-4'
                label='Departure Time'
                name='departureTime'
                type='datetime-local'
                value={bus.departureTime}
                onChange={handleInputChange}
              />
              {errors.departureTime && <span style={errorStyle}>{errors.departureTime}</span>}
            </div>

            <div style={fieldStyle}>
              <MDBInput
                wrapperClass='mb-4'
                label='Arrival Time'
                name='arrivalTime' 
                type='datetime-local'
                value={bus.arrivalTime}
                onChange={handleInputChange}
              />
              {errors.arrivalTime && <span style={errorStyle}>{errors.arrivalTime}</span>}
            </div>

            <div style={fieldStyle}>
              <MDBInput
                wrapperClass='mb-4'
                label='TimeToReach'
                name='timeToReach'
                value={bus.timeToReach}
                onChange={handleInputChange}
              />
              {errors.timeToReach && <span style={errorStyle}>{errors.timeToReach}</span>}
            </div>

            <div style={fieldStyle}>
              <MDBInput
                wrapperClass='mb-4'
                label='Fare'
                name='fare'
                type='number'
                value={bus.fare}
                onChange={handleInputChange}
              />
              {errors.fare && <span style={errorStyle}>{errors.fare}</span>}
            </div>

            <div style={fieldStyle}>
              <p>Available Seats: {bus.availableSeats}</p>

          
            </div>


            <MDBCard className='mb-4 p-3'>
              <h5>Seat Layout</h5>
              <MDBRow>
                <MDBCol size='6'>
                  <MDBInput
                    label='Rows'
                    name='row'
                    type='number'
                    value={bus.row}
                    onChange={handleInputChange}
                  />
                  {errors.row && <span style={errorStyle}>{errors.row}</span>}
                </MDBCol>
                <MDBCol size='6'>
                  <MDBInput
                    label='Columns'
                    name='column'
                    type='number'
                    value={bus.column}
                    onChange={handleInputChange}
                  />
                  {errors.column && <span style={errorStyle}>{errors.column}</span>}
                </MDBCol>
              </MDBRow>
            </MDBCard>
{/* Seat Layout display */}
{seatLayout.length > 0 && (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', border: '1px solid black', padding: '10px' }}>
    {seatLayout.map((col, colIndex) => (
      <div key={colIndex} style={{ display: 'flex', flexDirection: 'column', marginRight: (colIndex === 0 && seatLayout.length === 3) ? '20px' : '0' }}>
        {col.map((seat, rowIndex) => (
          <div
            key={seat.id}
            style={{
              margin: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {seat.available && <MdEventSeat style={{ fontSize: '24px', color: 'gray' }} />}
          </div>
        ))}
      </div>
    ))}
  </div>
)}












            <div style={fieldStyle}>
              <MDBInput
                wrapperClass='mb-4'
                label='Bus Image URL'
                name='busURL'
                value={bus.busURL}
                onChange={handleInputChange}
              />
              {errors.busURL && <span style={errorStyle}>{errors.busURL}</span>}
            </div>

            {/* <div style={fieldStyle}>
              <input
                type='checkbox'
                id='busAvailability'
                name='busAvailability'
                checked={bus.busAvailability}
                onChange={(e) => setBus((prevBus) => ({ ...prevBus, busAvailability: e.target.checked }))}
              />
              <label htmlFor='busAvailability'>Bus Availability</label>
            </div> */}

            <button type='submit'>Add Bus</button>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default AddBus;
