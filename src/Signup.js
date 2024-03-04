import React, { useState } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
  const [state, setState] = useState({
    firstname: '',
    lastName: '',
    email: '',
    password: '',
    PhoneNumber: '',
    confirmpassword: '',
    gender: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  async function SignupApi(e) {
    e.preventDefault();
  
    // Check if any field is empty
    if (
      state.firstname === '' ||
      state.lastName === '' ||
      state.email === '' ||
      state.password === '' ||
      state.PhoneNumber === '' ||
      state.gender === ''
    ) {
      // Display a general message
      toast.warning('Please fill in all the fields.');
  
      // Display specific messages for each empty field
      if (state.firstname === '') {
        toast.warning('First Name field is required.');
      }
  
      if (state.lastName === '') {
        toast.warning('Last Name field is required.');
      }
  
      if (state.email === '') {
        toast.warning('Email field is required.');
      }
  
      if (state.password === '') {
        toast.warning('Password field is required.');
      }
  
      if (state.PhoneNumber === '') {
        toast.warning('Mobile Number field is required.');
      }
  
      if (state.gender === '') {
        toast.warning('Gender field is required.');
      }
  
      return;
    }
  
    // Validation for a valid email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(state.email)) {
      toast.warning('Please enter a valid email address.');
      return;
    }
  
    // Validation for a strong password
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
    if (!strongPasswordRegex.test(state.password)) {
      toast.warning(
        'Password should contain a minimum of seven characters with a mix of uppercase letters, numbers, and special characters.'
      );
      return;
    }
  
    // Validation for password and confirm password match
    if (state.password !== state.confirmpassword) {
      toast.warning('Password and Confirm Password do not match.');
      return;
    }
  
    // Validation for a valid phone number (assuming it should be a 10-digit number)
    if (state.PhoneNumber.length !== 10) {
      toast.warning('The length of the mobile number should be 10.');
      return;
    }

    try {
      let item = { ...state };
      let result = await fetch('http://localhost:88/api/Signups', {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      result = await result.json();
      console.log(result);

      if (result === 'Signup Done') {
        navigate('/login');
      } else {
        toast.error('Signup unsuccessful');
      }

      // Clear the form after successful submission
      setState({
        firstname: '',
        lastName: '',
        email: '',
        password: '',
        PhoneNumber: '',
        confirmpassword: '',
        gender: '',
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">
      <ToastContainer/>
      <MDBRow>
        <MDBCol col='12' md='6'>
          <img src="https://blog.redbus.in/wp-content/uploads/2023/02/Copy-of-redBus.com-cover-3.jpg" className="img-fluid" alt="Sample image" />
        </MDBCol>

        <MDBCol col='12' md='6'>
          <MDBRow>
            <MDBCol size="6">
              <MDBInput wrapperClass='mb-4' name='firstname' label='First Name' id='firstname' value={state.firstname} onChange={handleChange} size="lg" />
            </MDBCol>
            <MDBCol size="6">
              <MDBInput wrapperClass='mb-4' name='lastName' label='Last Name' id='lastName' value={state.lastName} onChange={handleChange} size="lg" />
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol size="6">
              <MDBInput wrapperClass='mb-4' name='email'label='Email address' id='email' value={state.email} onChange={handleChange} type='email' size="lg" />
            </MDBCol>
            <MDBCol size="6">
              <MDBInput wrapperClass='mb-4' name='password'label='Password' id='password' value={state.password} onChange={handleChange} type='password' size="lg" />
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol size="6">
              <MDBInput wrapperClass='mb-4' name='confirmpassword'label='Confirm Password' id='confirmpassword' value={state.confirmpassword} onChange={handleChange} type='password' size="lg" />
            </MDBCol>
            <MDBCol size="6">
              <MDBInput wrapperClass='mb-4' name='PhoneNumber' label='Mobile No' id='PhoneNumber' value={state.PhoneNumber} onChange={handleChange} size="lg" />
            </MDBCol>
                      </MDBRow>
          <MDBRow>
          <MDBCol size="6">
              {/* Use a standard HTML select element for the Gender dropdown */}
              <label htmlFor="gender" className="form-label">Gender</label>
              <select id="gender" name="gender" className="form-select mb-4" value={state.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Other</option>
              </select>
            </MDBCol>
          </MDBRow>
          {/* Center the register button */}
          <div className='text-center text-md-start mt-4 pt-2'>
          <button className="btn-btn-primary" size='lg' onClick={SignupApi} style={{ width: '150px' }}>
          Register
        </button>
        <p className="small fw-bold mt-2 pt-1 mb-2">
          Already have an account? <a href="/login" className="link-danger">Login</a>
        </p>
      </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Signup;

