import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Booking() {
    const [bookings, setBookings] = useState([]);
    const [busDetails, setBusDetails] = useState({});

    useEffect(() => {
        // Fetch bookings when component mounts
        
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const uid=localStorage.getItem('signupid');
            const response = await axios.get(`http://localhost:88/api/Bookings/mybookings?id=${uid}`);
            // Assuming the response data is an array of bookings
            setBookings(response.data);
            // Fetch bus details for each booking
            response.data.forEach(async booking => {
                const details = await fetchBusDetails(booking.busId);
                setBusDetails(prevDetails => ({
                    ...prevDetails,
                    [booking.busId]: details
                }));
            });
        } catch (error) {
            console.error('Error fetching bookings:', error);
            // Handle error, e.g., show an error message to the user
        }
    };

    const fetchBusDetails = async (busId) => {
        try {
            const response = await axios.get(`http://localhost:88/api/Buses/${busId}`);
            // Assuming the response data contains source and destination
            const { source, destination } = response.data;
            return { source, destination };
        } catch (error) {
            console.error('Error fetching bus details:', error);
            return { source: 'N/A', destination: 'N/A' }; // Default values in case of error
        }
    };

    return (
        <div>
            <h2 style={{textAlign: 'center'}}>My Bookings</h2>
            <div style={styles.cardContainer}>
                {bookings.map((booking, index) => (
                    <div key={index} style={styles.card}>
                        <h3>Booking ID: {booking.bookingId}</h3>
                        {/* <p>Bus ID: {booking.busId}</p>
                        <p>Signup ID: {booking.signupId}</p> */}
                        {/* <p>Selected Seat: {booking.selectedSeat}</p> */}
                        <p>Booking Time: {new Date(booking.bookingTime).toLocaleString()}</p>
                        <p>Number of Seats: {booking.numberOfSeats}</p>
                        <p>Total Fare: ${booking.totalFare}</p>
                        <p>Status: {booking.status}</p>

                        {/* <p><strong>Status:</strong> <span style={{ color: booking.status === 'completed' ? 'orange' : (booking.status === 'booked' ? 'blue' : 'inherit')}}>{booking.status}</span></p> */}
                        {busDetails[booking.busId] && (
                            <>
                                <p>Source: {busDetails[booking.busId].source}</p>
                                <p>Destination: {busDetails[booking.busId].destination}</p>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

const styles = {
    cardContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        margin: '0 auto',
        maxWidth: '1000px'
    },
    card: {
        width: '30%',
        marginBottom: '20px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff'
    }
};

export default Booking;
