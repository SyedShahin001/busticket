import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBRow, MDBCol, MDBBtn } from 'mdb-react-ui-kit';

const UpdateForm = ({ onClose, onSubmit }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { busDetails } = location.state || { busDetails: null };
  const { busId } = useParams();

  const handleClose = () => {
    navigate('/BusDetailsCard');
  };

  const [updatedDetails, setUpdatedDetails] = useState({
    busName: '',
    busDescription: '',
    category: '',
    source: '',
    destination: '',
    departureTime: '',
    arrivalTime: '',
    fare: 0,
    timeToReach: '', // Time to Reach field
    busAvailability: true,
  });

  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:88/api/Buses/${busId}`);
        setUpdatedDetails(response.data);
        calculateTimeToReach(response.data.departureTime, response.data.arrivalTime); // Calculate time to reach on initial load
      } catch (error) {
        console.error('Error fetching bus details:', error);
      }
    };

    fetchBusDetails();
  }, [busId]);

  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   setUpdatedDetails((prevDetails) => ({
  //     ...prevDetails,
  //     [name]: type === 'checkbox' ? checked : value,
  //   }));

  //   if (name === 'departureTime' || name === 'arrivalTime') {
  //     calculateTimeToReach(updatedDetails.departureTime, updatedDetails.arrivalTime);
  //   }
  // };


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdatedDetails((prevDetails) => ({
      ...prevDetails,
      [name]: type === 'checkbox' ? checked : value,
    }));
  
    if (name === 'departureTime' || name === 'arrivalTime') {
      calculateTimeToReach(name === 'departureTime' ? value : updatedDetails.departureTime, name === 'arrivalTime' ? value : updatedDetails.arrivalTime);
    }
  };
  

  const calculateTimeToReach = (departureTime, arrivalTime) => {
    if (departureTime && arrivalTime) {
      const departureTimestamp = new Date(departureTime).getTime();
      const arrivalTimestamp = new Date(arrivalTime).getTime();
      const timeDifference = arrivalTimestamp - departureTimestamp;
      const hours = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const timeToReach = `${hours} hours ${minutes} minutes`;
      setUpdatedDetails((prevDetails) => ({
        ...prevDetails,
        timeToReach: timeToReach,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:88/api/Buses/${busId}`, updatedDetails);
      navigate('/BusDetailsCard');
    } catch (error) {
      console.error('Error updating bus details:', error);
    }
  };

  return (
    <MDBContainer className='my-5'>
      <MDBCard>
        <MDBCardBody>
          <form onSubmit={handleSubmit}>
            <MDBRow className='g-0'>
              <MDBCol md='6' className='mb-3'>
                <MDBInput label='Bus Name' name='busName' value={updatedDetails.busName} onChange={handleChange} />
              </MDBCol>
              <MDBCol md='6' className='mb-3'>
                <MDBInput label='Bus Description' name='busDescription' value={updatedDetails.busDescription} onChange={handleChange} />
              </MDBCol>
            </MDBRow>
            <MDBRow className='g-0'>
              <MDBCol md='6' className='mb-3'>
                <MDBInput label='Category' name='category' value={updatedDetails.category} onChange={handleChange} />
              </MDBCol>
              <MDBCol md='6' className='mb-3'>
                <MDBInput label='Source' name='source' value={updatedDetails.source} onChange={handleChange} />
              </MDBCol>
            </MDBRow>
            <MDBRow className='g-0'>
              <MDBCol md='6' className='mb-3'>
                <MDBInput label='Destination' name='destination' value={updatedDetails.destination} onChange={handleChange} />
              </MDBCol>
              <MDBCol md='6' className='mb-3'>
                <MDBInput label='Departure Time' name='departureTime' type='datetime-local' value={updatedDetails.departureTime} onChange={handleChange} min={getCurrentDateTime()} />
              </MDBCol>
            </MDBRow>
            <MDBRow className='g-0'>
              <MDBCol md='6' className='mb-3'>
                <MDBInput label='Arrival Time' name='arrivalTime' type='datetime-local' value={updatedDetails.arrivalTime} onChange={handleChange} min={getCurrentDateTime()} />
              </MDBCol>
              <MDBCol md='6' className='mb-3'>
                <MDBInput label='Fare' name='fare' type='number' value={updatedDetails.fare} onChange={handleChange} />
              </MDBCol>
            </MDBRow>
            <MDBRow className='g-0'>
              <MDBCol md='6' className='mb-3'>
                <MDBInput label='Time to Reach' name='timeToReach' value={updatedDetails.timeToReach} onChange={handleChange} />
              </MDBCol>
            </MDBRow>
            <MDBRow className='g-0 justify-content-center'>
              <MDBCol md='6' className='mb-3'>
                <div className='d-grid gap-2'>
                  <button className='btn btn-primary'>Update</button>
                </div>
              </MDBCol>
              <MDBCol md='6' className='mb-3'>
                <div className='d-grid gap-2'>
                  <button className='secondary' onClick={handleClose}>Cancel</button>
                </div>
              </MDBCol>
            </MDBRow>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

const getCurrentDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1 < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1;
  const day = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate();
  const hours = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours();
  const minutes = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export default UpdateForm;
