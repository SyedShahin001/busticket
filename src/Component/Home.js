// Home.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import the CSS file
import { IoBusOutline } from "react-icons/io5";

const Home = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [noBusesFound, setNoBusesFound] = useState(false);
  const [errorFields, setErrorFields] = useState([]);

  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      setLoading(true);
  
      // Clear previous errors
      setErrorFields([]);
      setNoBusesFound(false);
  
      // Validate input fields
      const fields = ['from', 'to', 'date'];
      const errors = fields.filter(field => !eval(field.trim())); // Check if fields are empty
  
      if (errors.length > 0) {
        setErrorFields(errors);
        return;
      }
  
      const response = await fetch(
        `https://localhost:7127/api/Buses/Search?source=${from}&destination=${to}&date=${date}`
      );
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
  
      setSearchResults(data);
  
      if (data.length > 0) {
        // If buses found, navigate to BusDetails component
        navigate('/BusDetails', { state: { searchResults: data } });
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setNoBusesFound(true);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="home-container">
      <h1>Welcome to RedBus</h1>
      <div className="search-input">
        <label htmlFor="from"><IoBusOutline /><strong>FROM:</strong></label>
        <input
          type="text"
          id="from"
          value={from} 
          onChange={(e) => setFrom(e.target.value)}
          className={errorFields.includes('from') ? 'error' : ''}
        />

        <label htmlFor="to"><IoBusOutline /><strong>TO:</strong></label>
        <input
          type="text"
          id="to"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className={errorFields.includes('to') ? 'error' : ''}
        />
        <label htmlFor="date"><strong>Date:</strong></label>
<input
  type="date"
  id="date"
  value={date}
  onChange={(e) => setDate(e.target.value)}
  min={new Date().toISOString().split('T')[0]} // Set min attribute to the current date
  className={errorFields.includes('date') ? 'error' : ''}
/>


        
        <button onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {errorFields.length > 0 && <p className="error-message"><b>Please Fill In All Fields</b></p>}
      {noBusesFound && <p className="error-message"><b>No Matching Buses Found</b></p>}
    </div>
  );
};

export default Home;
