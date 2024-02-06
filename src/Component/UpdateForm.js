import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import './UpdateForm.css';

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

  const handleCancel = () => {
    navigate('/BusDetailsCard');
  };

  return (
    <form onSubmit={handleSubmit} className="update-form">
      <div className="top-section">
        <h2>Update Bus Details</h2>
            <div className="form-row">
              <label>
                Bus Name:
                <input type="text" name="busName" value={updatedDetails.busName} onChange={handleChange} />
              </label>
              <label>
                Bus Description:
                <input type="text" name="busDescription" value={updatedDetails.busDescription} onChange={handleChange} />
              </label>
            </div>
            <div className="form-row">
              <label>
                Category:
                <input type="text" name="category" value={updatedDetails.category} onChange={handleChange} />
              </label>
              <label>
                Source:
                <input type="text" name="source" value={updatedDetails.source} onChange={handleChange} />
              </label>
            </div>
            <div className="form-row">
              <label>
                Destination:
                <input type="text" name="destination" value={updatedDetails.destination} onChange={handleChange} />
              </label>
              <label>
                Departure Time:
                <input type="datetime-local" name="departureTime" value={updatedDetails.departureTime} onChange={handleChange} />
              </label>
            </div>
            <div className="form-row">
              <label>
                Arrival Time:
                <input type="datetime-local" name="arrivalTime" value={updatedDetails.arrivalTime} onChange={handleChange} />
              </label>
              <label>
                Fare:
                <input type="number" name="fare" value={updatedDetails.fare} onChange={handleChange} />
              </label>
            </div>
            <div className="form-row">
              <label>
                Time to Reach:
                <input type="text" name="timeToReach" value={updatedDetails.timeToReach} onChange={handleChange} />
              </label>
              {/* 
                Commenting out the Bus Availability field since it's not displayed
                <label>
                  Bus Availability:
                  <input type="checkbox" name="busAvailability" checked={updatedDetails.busAvailability} onChange={handleChange} />
                </label>
              */}
            </div>
          </div>
          <div className="button-row">
            <button type="submit">Update</button>
            <button type="button" onClick={handleClose}s>
              Cancel
            </button>
          </div>
        </form>
      );
    };
    
    export default UpdateForm;