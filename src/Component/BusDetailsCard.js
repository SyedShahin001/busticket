import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BusDetailsCard = () => {
  const [originalBusDetails, setOriginalBusDetails] = useState([]);
  const [busDetails, setBusDetails] = useState([]);
  const [editingBus, setEditingBus] = useState(null);
  const [searchCategory, setSearchCategory] = useState('');
  const [searchBusName, setSearchBusName] = useState('');
  const [filteredBusNames, setFilteredBusNames] = useState([]);

  useEffect(() => {
    fetch('https://localhost:7127/api/Buses')
      .then(response => response.json())
      .then(data => {
        setOriginalBusDetails(data);
        setBusDetails(data);
      })
      .catch(error => console.error('Error fetching bus details:', error));
  }, []);

  const handleUpdateClick = (bus) => {
    setEditingBus(bus);
  };

  const handleSearchCategoryChange = (e) => {
    setSearchCategory(e.target.value);
    // Filter bus names based on the selected category
    const categoryFilteredBusNames = originalBusDetails
      .filter(bus => bus.category.toLowerCase() === e.target.value.toLowerCase())
      .map(bus => bus.busName);
    setFilteredBusNames(categoryFilteredBusNames);
    // Clear the selected bus name when changing the category
    setSearchBusName('');
  };

  const handleSearchClick = () => {
    // Filter the busDetails array based on the entered criteria
    const filteredBuses = originalBusDetails.filter(bus => {
      const matchesCategory = bus.category.toLowerCase().includes(searchCategory.toLowerCase());
      const matchesBusName = bus.busName.toLowerCase().includes(searchBusName.toLowerCase());
      return matchesCategory && matchesBusName;
    });

    // Update the state with the filtered buses
    setBusDetails(filteredBuses);
  };

  return (
    <div style={pageContainerStyle}>
      <div style={searchBarStyle}>
        <label>
          Category:
          <select value={searchCategory} onChange={handleSearchCategoryChange}>
            <option value="">Select Category</option>
            <option value="AC">AC</option>
            <option value="Non-AC">Non-AC</option>
          </select>
        </label>
        <label>
          Bus Name:
          <select value={searchBusName} onChange={(e) => setSearchBusName(e.target.value)}>
            <option value="">Select Bus Name</option>
            {filteredBusNames.map((busName, index) => (
              <option key={index} value={busName}>{busName}</option>
            ))}
          </select>
        </label>
        <button style={searchButtonStyle} onClick={handleSearchClick}>Search</button>
      </div>
      <div style={cardsContainer}>
        {busDetails.map(bus => (
          <div key={bus.busNumber} style={cardStyle}>
            <h3>{bus.busName}</h3>
            <p>{bus.busDescription}</p>
            <p>Category: {bus.category}</p>
            <p>Source: {bus.source}</p>
            <p>Destination: {bus.destination}</p>
            <p>Departure Time: {bus.departureTime}</p>
            <p>Arrival Time: {bus.arrivalTime}</p>
            <p>Fare: {bus.fare}</p>
            <p>Time to Reach: {bus.timeToReach}</p>
            <Link to={{ pathname: `/UpdateForm/${bus.busId}`, state: { busDetails: bus } }}>
              <button style={updateButtonStyle} onClick={() => handleUpdateClick(bus)}>Update</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const updateButtonStyle = {
  backgroundColor: 'blue',
  color: 'white',
  padding: '10px',
  border: 'none',
  cursor: 'pointer',
  marginLeft: '10px',
  marginTop: '10px',
};

const pageContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const searchBarStyle = {
  marginBottom: '20px',
};

const searchButtonStyle = {
  backgroundColor: 'blue',
  color: 'white',
  padding: '10px',
  border: 'none',
  cursor: 'pointer',
  marginLeft:'10px',
  marginTop:'10px',
};

const cardsContainer = {
  display: 'flex',
  flexWrap: 'wrap',
};

const cardStyle = {
  border: '1px solid #ccc',
  padding: '10px',
  margin: '10px',
  borderRadius: '5px',
  width: '300px',
};

export default BusDetailsCard;
