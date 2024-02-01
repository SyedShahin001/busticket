import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#dc3545' }}>
      <div className="container">
        {/* Display the RedBus logo on the left */}
        
          <img src="https://seeklogo.com/images/R/redbus-logo-5B2A75C4DA-seeklogo.com.png" alt="RedBus Logo" style={{ width: '50px', height: 'auto',fontSize:"50px" }} />
        
        
        {/* Navigation Links on the right */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
             <li className="nav-item">
              <Link to="/Landingpage" className="nav-link" style={{ color: 'white' }}>
                Home
              </Link>
            </li> 
            <li className="nav-item">
              <Link to="/Signup" className="nav-link" style={{ color: 'white' }}>
                Signup
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Login" className="nav-link" style={{ color: 'white' }}>
                Login
              </Link>
            </li>
            
            {/* Add more navigation links as needed */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
