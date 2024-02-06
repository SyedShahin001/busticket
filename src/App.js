import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Switch, BrowserRouter,useLocation } from 'react-router-dom';
import Home from './Component/Home';
import BusDetails from './Component/BusDetails';
import Navbar from './Navbar';
import ImageSlider from './ImageSlider';
import Slide from './Slide';
import Landingpage from './Landingpage';
import About from './About';
import Contactus from './Contactus';
import Signup from './Signup';
import Login from './Login';
import { Nav } from 'react-bootstrap';
import BusLayout from './Component/BusLayout';
import PaymentPage from './Component/Payment';
import Paymentsuccess from './Component/Paymentsuccess';
import BookingDetails from './Component/BookingDetails';
import AddBus from './AddBus';
import BusDetailsCard from './Component/BusDetailsCard';
import UpdateForm from './Component/UpdateForm';
import Booking from './Booking';
import ImageComponent from './ImageComponent';
// import PdfDocument from './Component/PdfDocument';




function App() {

  return (
    
    <Router>
  <Navbar/>
      <Routes>

        <Route path="/" element={<Landingpage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Landingpage" element={<Landingpage />} />
        <Route path="/BusDetails" element={<BusDetails />} />
        <Route path ="/AddBus" element={<AddBus/>}/>
        <Route path="/ImageSlider" element={<ImageSlider />} />
        <Route path="/Slide" element={<Slide />} />
        <Route path="/Contactus" element={<Contactus />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/buslayout' element={<BusLayout/>}/>
        <Route path='/PaymentPage' element={<PaymentPage/>}/>
        <Route path='/Paymentsuccess' element={<Paymentsuccess/>}/>
        <Route path='/BookingDetails' element={<BookingDetails/>}/>
        <Route path='/BusDetailsCard' element={<BusDetailsCard/>}/>
        <Route path='/UpdateForm/:busId' element={<UpdateForm />} />
        <Route path='/AddBus' element={<AddBus/>}/>
        {/* <Route path='/PdfDocument' element={<PdfDocument/>}/> */}
        <Route path='/bookings' element={<Booking/> }  />
        <Route path='/ImageComponent' element={<ImageComponent/> }  />
        

        
        
      

    
      
      
      </Routes>
    </Router>

  
    
  );
}

export default App;


