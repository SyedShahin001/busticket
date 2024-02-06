import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const role =localStorage.getItem("role")

  useEffect(() => {
    const logged = localStorage.getItem("log");
    setIsLoggedIn(logged === 'true');
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
    window.location.reload();
  };

  return (
    <>
  { role==="Customer" ? <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#dc3545' }}>
  <div className="container">
    {/* Display the RedBus logo on the left */}
    <img src="https://seeklogo.com/images/R/redbus-logo-5B2A75C4DA-seeklogo.com.png" alt="RedBus Logo" style={{ width: '50px', height: 'auto', fontSize: "50px" }} />

    {/* Display "RedBus" text next to the logo */}
    <span style={{ color: 'white', fontSize: '24px', marginLeft: '10px' }}>RedBus</span>

        {/* Navigation Links on the right */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            {isLoggedIn && (
              <>
                
                
                <li className="nav-item">
                  <Link to="/Landingpage" className="nav-link" style={{ color: 'white' }}>
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" onClick={handleLogout} className="nav-link" style={{ color: 'white' }}>
                    Logout
                  </Link>
                </li>
                <li className="nav-item">
                  <span className="nav-link" style={{ color: 'white' }}> <b><CgProfile /></b>
                     Welcome, {name}
                  </span>
                </li>
              </>
            )}
            {!isLoggedIn && (
              <>
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
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
:  //Admin navbar
<nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#dc3545' }}>
  <div className="container">
    {/* Display the RedBus logo on the left */}
    <img src="https://seeklogo.com/images/R/redbus-logo-5B2A75C4DA-seeklogo.com.png" alt="RedBus Logo" style={{ width: '50px', height: 'auto', fontSize: "50px" }} />

    {/* Display "RedBus" text next to the logo */}
    <span style={{ color: 'white', fontSize: '24px', marginLeft: '10px' }}>RedBus</span>

        {/* When ADMIN is logged in display these */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            {isLoggedIn && (
              <>
                
                
                <li className="nav-item">
                  <Link to="/Landingpage" className="nav-link" style={{ color: 'white' }}>
                    Home
                  </Link>
                </li>
                {/* Add things here */}
                <li className="nav-item">
                  <Link to="/AddBus" className="nav-link" style={{ color: 'white' }}>
                  Bus
                  </Link>
                </li>
                
                <li className="nav-item">
                  <Link to="/BookingDetails" className="nav-link" style={{ color: 'white' }}>
                    Bookings
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/BusDetailsCard" className="nav-link" style={{ color: 'white' }}>
                  Travels
                  </Link>
                </li>
                
                <li className="nav-item">
                  <Link to="/login" onClick={handleLogout} className="nav-link" style={{ color: 'white' }}>
                    Logout
                  </Link>
                </li>
                <li className="nav-item">
                  <span className="nav-link" style={{ color: 'white' }}> <b><CgProfile /></b>
                     (Admin)Welcome, {name}
                  </span>
                </li>
              </>
            )}
            {!isLoggedIn && (
              <>
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
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
}
    </>
  );
};

export default Navbar;
