import React, { useState, useEffect } from 'react';

function UserDetails() {
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    fetch('http://localhost:88/api/Signups')
      .then(response => response.json())
      .then(data => {
        // Filter out users with the role "Admin", "shahin@gmail.com", or "shailesh@gmail.com"
        const filteredUsers = data.filter(user => user.role !== "Admin" && user.email !== "shahin@gmail.com" && user.email !== "shailesh@gmail.com");
        setUserDetails(filteredUsers);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    border: '2px solid #ddd'
  };

  const thTdStyle = {
    padding: '8px',
    textAlign: 'left',
    border: '1px solid #ddd'
  };

  const evenRowStyle = {
    backgroundColor: '#f2f2f2'
  };

  const hoverRowStyle = {
    backgroundColor: '#ddd'
  };

  const getTextColor = (gender) => {
    return gender === 'Female' ? {color: 'teal'} : {color: 'blue'};
  };

  return (
    <div style={{margin: '20px', textAlign: 'center'}}>
      <div style={{marginBottom: '20px'}}>
        <h2>User Details</h2>
      </div>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thTdStyle}>First Name</th>
            <th style={thTdStyle}>Last Name</th>
            <th style={thTdStyle}>Email</th>
            <th style={thTdStyle}>Phone Number</th>
            <th style={thTdStyle}>Gender</th>
          </tr>
        </thead>
        <tbody>
          {userDetails.map((user, index) => (
            <tr key={index} style={{...thTdStyle, ...(index % 2 === 0 ? evenRowStyle : {}), ...getTextColor(user.gender)}}>
              <td style={thTdStyle}>{user.firstName}</td>
              <td style={thTdStyle}>{user.lastName}</td>
              <td style={thTdStyle}>{user.email}</td>
              <td style={thTdStyle}>{user.phoneNumber}</td>
              <td style={thTdStyle}>{user.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserDetails;
