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
    timeToReach: '',
    busAvailability: true,
  });

  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        const response = await axios.get(`https://localhost:7127/api/Buses/${busId}`);
        setUpdatedDetails(response.data);
      } catch (error) {
        console.error('Error fetching bus details:', error);
      }
    };

    fetchBusDetails();
  }, [busId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdatedDetails((prevDetails) => ({
      ...prevDetails,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`https://localhost:7127/api/Buses/${busId}`, updatedDetails);
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
                <MDBInput label='Departure Time' name='departureTime' type='datetime-local' value={updatedDetails.departureTime} onChange={handleChange} />
              </MDBCol>
            </MDBRow>
            <MDBRow className='g-0'>
              <MDBCol md='6' className='mb-3'>
                <MDBInput label='Arrival Time' name='arrivalTime' type='datetime-local' value={updatedDetails.arrivalTime} onChange={handleChange} />
              </MDBCol>
              <MDBCol md='6' className='mb-3'>
                <MDBInput label='Fare' name='fare' type='number' value={updatedDetails.fare} onChange={handleChange} />
              </MDBCol>
            </MDBRow>
            <MDBRow className='g-0'>
              <MDBCol md='6' className='mb-3'>
                <MDBInput label='Time to Reach' name='timeToReach' value={updatedDetails.timeToReach} onChange={handleChange} />
              </MDBCol>
              {/* 
                Uncomment the following section if you want to include Bus Availability field
                <MDBCol md='6' className='mb-3'>
                  <div className='form-check'>
                    <input className='form-check-input' type='checkbox' name='busAvailability' checked={updatedDetails.busAvailability} onChange={handleChange} />
                    <label className='form-check-label'>Bus Availability</label>
                  </div>
                </MDBCol>
              */}
            </MDBRow>
            <MDBRow className='g-0 justify-content-center'>
              <MDBCol md='6' className='mb-3'>
                <div className='d-grid gap-2'>
                  <MDBBtn type='submit'>Update</MDBBtn>
                </div>
              </MDBCol>
              <MDBCol md='6' className='mb-3'>
                <div className='d-grid gap-2'>
                  <MDBBtn color='secondary' onClick={handleClose}>Cancel</MDBBtn>
                </div>
              </MDBCol>
            </MDBRow>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default UpdateForm;
