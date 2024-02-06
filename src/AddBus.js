import React, { useState } from 'react';
import axios from 'axios';
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBRow, MDBCol, MDBCardImage } from 'mdb-react-ui-kit';

const BusDetailsForm = ({ bus, handleInputChange, errors }) => {
  const fieldStyle = {
    marginBottom: '15px',
  };

  const errorStyle = {
    color: 'red',
  };

  return (
    <div>
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
    </div>
  );
};

const TimeDetailsForm = ({ bus, handleInputChange, setBus, errors }) => {
  const fieldStyle = {
    marginBottom: '15px',
  };

  const errorStyle = {
    color: 'red',
  };

  return (
    <div>
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
    </div>
  );
};

const AddBus = () => {
  const [bus, setBus] = useState({
    busNumber: '',
    busName: '',
    busDescription: '',
    category: '',
    source: '',
    destination: '',
    departureTime: '',
    arrivalTime: '',
    fare: '',
    timeToReach: '',
    busAvailability: true,
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Calculate TimeToReach when Arrival Time and Departure Time are provided
    if (name === 'arrivalTime' || name === 'departureTime') {
        const arrivalTime = new Date(name === 'arrivalTime' ? value : bus.arrivalTime);
        const departureTime = new Date(name === 'departureTime' ? value : bus.departureTime);
  
        if (!isNaN(arrivalTime.getTime()) && !isNaN(departureTime.getTime())) {
          const timeToReachInMilliseconds = Math.abs(departureTime - arrivalTime);
          const hours = Math.floor(timeToReachInMilliseconds / (1000 * 60 * 60));
          const minutes = Math.floor((timeToReachInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
  
          // Format time based on total time
          const formattedTimeToReach = `${hours} hours ${minutes} minutes`;
  
          setBus((prevBus) => ({ ...prevBus, timeToReach: formattedTimeToReach }));
        }
      }

    // Update other input fields
    setBus((prevBus) => ({ ...prevBus, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: validateField(name, value) }));
  };

  const validateField = (name, value) => {
    // Your validation logic here
    // Example: If the field is empty, return an error message
    if (!value.trim()) {
      return `${name} is required.`;
    }

    // Additional validation rules as needed

    return ''; // No validation error
  };

  const validateForm = () => {
    const newErrors = {};

   

    if (!bus.busName) {
      newErrors.busName = 'Bus Name is required.';
    }

    if (!bus.busDescription) {
      newErrors.busDescription = 'Bus Description is required.';
    }

    if (!bus.category) {
      newErrors.category = 'Bus Category is required.';
    }

    if (!bus.source) {
      newErrors.source = 'Source is required.';
    }

    if (!bus.destination) {
      newErrors.destination = 'Destination is required.';
    }

    if (!bus.arrivalTime) {
      newErrors.arrivalTime = 'Arrival Time is required.';
    }

    if (!bus.departureTime) {
      newErrors.departureTime = 'Departure Time is required.';
    }

    if (bus.fare <= 0) {
      newErrors.fare = 'Fare should be greater than 0.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    if (!validateForm()) {
      // Handle validation errors
      return;
    }

    try {
        // Your asynchronous code here
        const response = await axios.post('https://localhost:7127/api/Buses', bus);
  
        // Assuming the API response contains the newly added bus data
        const newBusData = response.data;
  
        // Handle the response data as needed
        console.log('New Bus Data:', newBusData);
  
        // Clear form data or update the state as needed
        setBus({
          busNumber: '',
          busName: '',
          busDescription: '',
          category: '',
          source: '',
          destination: '',
          departureTime: '',
          arrivalTime: '',
          fare: '',
          timeToReach: '',
          busAvailability: true,
        });
  
        // Show success message to the user or perform any other actions
      } catch (error) {
        console.error(error);
        // Handle error, show an error message to the user
      }
    };
  

  const pageStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: '50px',
  };
  const buttonStyle = {
    marginTop: '20px',
    alignItems: 'center', // Add some space between the forms and the button
  };

  return (
    <MDBContainer className='my-5'>
  <MDBCard>
    <MDBRow className='g-0 d-flex align-items-center'>
      <MDBCol md='4'>
        <MDBCardImage src='https://miro.medium.com/v2/resize:fit:700/1*S-95TWd9jgxT87cKkZWnFg.jpeg' alt='bus' className='rounded-t-5 rounded-tr-lg-0' fluid style={{ height: '500px' }} />
      </MDBCol>

          <MDBCol md='8'>
            <MDBCardBody>
              <form>
                <div style={pageStyle}>
                  <BusDetailsForm bus={bus} handleInputChange={handleInputChange} errors={errors} />
                  <TimeDetailsForm bus={bus} handleInputChange={handleInputChange} setBus={setBus} errors={errors} />
                </div>
                <button className="mb-4 w-100" onClick={handleSubmit}>
                  Add Bus
                </button>
              </form>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
};

export default AddBus;
