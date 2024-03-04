import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import from 'react-router-dom'

function Paymentsuccess() {
  const navigate = useNavigate();
  return (
    <div style={{ position: "absolute", top: "20vh", right: "25vw" }}>
      <img src="https://zeuxinnovation.com/wp-content/uploads/2023/04/maximising-user-satisfaction-1.jpg" alt="" />
      <br /><br />
      <button style={{ marginRight: "10px" }} className='btn btn-warning' onClick={() => navigate("/")}>Back to Home</button>
      <button className='btn btn-warning' onClick={() => navigate("/receipt")}>Download PDF</button>
    </div>
  );
}

export default Paymentsuccess;
