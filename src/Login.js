import React, { useState } from 'react';
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBInput, MDBCheckbox, MDBIcon } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const containerStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80vw',
    fontFamily: 'Roboto, sans-serif',
    color: '#fff',
  };

  async function login(e) {
    e.preventDefault();

    try {
      let item = { email, password };

      localStorage.setItem('email', email);

      let result = await fetch(`https://localhost:7127/api/Login?email=${email}&password=${encodeURIComponent(password)}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });

      result = await result.json();

      console.log(result);

      localStorage.setItem('token', result);

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (result !== 'unAuthorized' && email !== '' && password !== '') {
        toast.success('Login Successful');
        navigate('/Landingpage');
      } else if (!emailRegex.test(email) && email !== '') {
        toast.error('Email Format is invalid');
      } else if (email === '' || password === '') {
        toast.warning('Please fill all fields');
      } else {
        toast.error('Login Unsuccessful');
        toast.error('Invalid Email or Password');
      }
    } catch (error) {
      console.error(error);
    }

    setEmail('');
    setPassword('');
  }

  return (
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol sm='6'>
          <div className='d-flex flex-row ps-5 pt-5'>
            <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#709085' }}/>
            <span className="h1 fw-bold mb-0">Logo</span>
          </div>

          <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>
            <h3 className="fw-normal mb-3 ps-5 pb-3" style={{ letterSpacing: '1px' }}>Log in</h3>
            <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Email address' id='formControlLg' type='email' size="lg" value={email} onChange={(e) => setEmail(e.target.value)} />
            <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Password' id='formControlLg' type='password' size="lg" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="mb-4 px-5 mx-5 w-100" color='info' size='lg' onClick={login}>
              Login
            </button>
            <p className='ms-5'>Don't have an account? <a href="Signup" className="link-info">Register here</a></p>
          </div>
        </MDBCol>

        <MDBCol sm='6' className='d-none d-sm-block px-0'>
          <MDBCard style={{ width: '100%' }}>
            <MDBCardImage src='https://coachbuildersindia.com/wp-content/uploads/2024/01/RedBus-Report-2023.webp' alt='Login image' className='w-100' style={{ objectFit: 'cover', objectPosition: 'left' }} />
          </MDBCard>
        </MDBCol>
      </MDBRow>

      <ToastContainer />
    </MDBContainer>
  );
}

export default Login;
