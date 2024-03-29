import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import LoginIcon from '@material-ui/icons/AccountCircle';
import { Button } from '@material-ui/core';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from 'mdb-react-ui-kit';
//import UpdatePasswordForm from './Password/UpdatePasswordForm';

function LoginForm() {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const navigate = useNavigate();
  const [isLoggedIn, setisLoggedIn] = useState(true);
  const [errorMsg, seterrorMsg] = useState('');
  const [errorMsg1, seterrorMsg1] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
   
    const encodedpassword = encodeURIComponent(password);

    // useEffect(()=>{
    //   fetchData();
    // })
 
    async function login() {
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      console.warn({ email, password });
 
     
     
 
      try {
        let item = { email, password };
        let result = await fetch(`http://localhost:88/api/LoginControllerTest?email=${email}&password=${encodedpassword}`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(item),
        });
        result = await result.json();
        localStorage.setItem('result',result);
        localStorage.setItem('par', result.token);
        localStorage.setItem("role",result.role);
        localStorage.setItem("Title",result.title)
        console.log(result);
       console.log(result.title);
        console.log(result.role);
        console.log(isLoggedIn);
       
        let item2 = { email, password };
        let result1 = await fetch(`http://localhost:88/api/LoginControllerTest/GetName?email=${email}&password=${encodedpassword}`,
         {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(item2),
        });
        result1 = await result1.json();
        console.log(result1); 
        //localStorage.setItem('hex',result1);
        localStorage.setItem('name', result1.firstName);
        localStorage.setItem('signupid',result1.signupId);
        console.log(`Global name is ${result1.firstName}`);
        console.log(localStorage.getItem('name').length);
        
 
        if (result.title !== 'Unauthorized' && result.status!==400) {
          localStorage.setItem('r',"Authorized");
          setisLoggedIn(true);
          
         if(email!="shahin@gmail.com")
          navigate('/Landingpage');
        else 
        navigate('/UserDetails')
          window.location.reload(); 
          
          setLoggedIn(true);
          toast.success("Login Sucessfull");
         
         
          Notify1();
        } else {
          console.log('User not found');
          setisLoggedIn(false);
          setLoggedIn(false);
          Notify();
       
        }
      } catch (error) {
        console.log(error);
      }
      console.log(loggedIn);
      localStorage.setItem("log",isLoggedIn);
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setisLoggedIn(false);
        seterrorMsg('Please Enter a Email Address in Valid format');
        toast.error("Please enter an email address in valid format");
        return false;
      }
 
      try {
        if (email === '') {
          setisLoggedIn(true);
          seterrorMsg('Please Enter An Email');
          return false;
        }
        seterrorMsg('');
        return true;
      } catch (error) {
        console.log(error);
      }
    } 
 
    // const fetchData = async () => {
     
    //   const response = await fetch(`http://localhost:88/api/Signup/GetSignupIdByEmail?email=${email}`,{
       
    //   });
    //   const jsonData = await response.json();
    //   console.log(jsonData);
    //   localStorage.setItem("CustomerId",jsonData)
     
     
 
    // };
 
    function validate() {
      try {
        if (password === '') {
          setisLoggedIn(true);
          seterrorMsg1('Please Enter A Password');
          return false;
        }
        seterrorMsg1('');
        return true;
      } catch (error) {
        console.log(error);
      }
    }
 
    const Notify = () => {
      toast.error('Login Unsuccessful');
    };
    const Notify1 = () => {
      toast.success('Login Successful');
    };
 
    const handleBoth = () => {
      login();
      validate();
     
    };
  return (
    <div
      style={{
        backgroundImage: 'url("https://media.istockphoto.com/id/879364174/photo/white-bus-traveling-on-the-asphalt-road-in-a-rural-landscape-at-sunset.jpg?s=612x612&w=0&k=20&c=AVMWs0BDjp3lEOfhOvnp2PPwBsmPBoZUhCpEG51KjVg=")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        minHeight: '100vh',
      }}
    >
    <MDBContainer fluid style={{  minHeight: '100vh' }}>
      <ToastContainer
position="top-right"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
 
/>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol sm='12' md='6' lg='4'>
          <MDBCard className='bg-white my-5' style={{ borderRadius: '1rem', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <MDBCardBody className='p-5'>
              <h2 className='fw-bold mb-4 text-center'>Login</h2>
              <p className='text-white-50 mb-4 text-center'>Please enter your login and password!</p>
              <h5>Email Address</h5>
              <MDBInput wrapperClass='mb-4' value={email} onChange={(e) => setemail(e.target.value)} type='email' size='lg' />
              {errorMsg ? <p style={{ color: 'red' }}>{errorMsg}</p> : ''}
              <h5>Password</h5>
              <div style={{ position: 'relative' }}>
                <MDBInput
                  wrapperClass='mb-4'
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  size='lg'
                />
                <Button
                  type='Button'
                  onClick={toggleShowPassword}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: '10px',
                    transform: 'translateY(-50%)',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                  }}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </Button>
              </div>
              {errorMsg1 ? <p style={{ color: 'red' }}>{errorMsg1}</p> : ''}
              <Button
                startIcon={<LoginIcon />}
                onClick={handleBoth}
               
                color='primary'
                variant='contained'
                fullWidth
                style={{ marginTop: '1rem' }}
              >
                Login
              </Button>
              {isLoggedIn ? null : (
                <p style={{ fontWeight: 'bold', color: 'red', textAlign: 'center', marginTop: '1rem' }}>
                  Email or Password is Incorrect
                </p>
              )}
              <p className='text-center mt-4'>
                New User? <a href='/Signup'>Create Account</a>
              </p>

              <p className='text-center mt-4'>
               not Remember your password <a href='/UpdatePasswordForm'>Forget Password</a>
              </p>
            
              <ToastContainer />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    </div>
  )
}
 
export default LoginForm