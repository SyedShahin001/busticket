import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Receipt = () => {
  const [billData, setBillData] = useState(null); //booking data
  const [busData, setBusData] = useState(null); //buses data
  const [touristData, setTouristData] = useState(null); //signup details
  const contentRef = useRef(null);
  const nav = useNavigate();

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

  const printReceipt = useReactToPrint({
    content: () => contentRef.current,
  });

  const bill = async () => {
    const bookingId = localStorage.getItem("bookingId");
    try {
      const { data: booking } = await axios.get(`http://localhost:88/api/Bookings/${bookingId}`);
      setBillData(booking);
      const { data: signup } = await axios.get(`http://localhost:88/api/Signups/${booking.signupId}`);
      setTouristData(signup);
      const { data: bus } = await axios.get(`http://localhost:88/api/Buses/${booking.busId}`);
      setBusData(bus);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    bill();
  }, []);

  return (
    <div className="container mt-4 container-form">
      <div className="card">
        <div className="card-body">
          <div className="container content my-3 mt-5" ref={contentRef} style={{ marginBottom: "100px", marginTop: "0px" }}>
            <div className="invoice-title">
              <h4 className="float-end font-size-15">
                Invoice <span className="badge bg-success font-size-12 ms-2">Paid</span>
              </h4>
              <div className="mb-4" style={{ display: "flex", alignItems: "center" }}>
              <h2 className="mb-1 text-muted" style={{ color: "red" }}>RedBus</h2>

                <img src="https://seeklogo.com/images/R/redbus-logo-5B2A75C4DA-seeklogo.com.png" alt="RedBus Logo" style={{ width: "50px", marginLeft: "10px" }} />
              </div>
              <div className="text-muted">
                <p className="mb-1">
                  <i className="uil uil-envelope-alt me-1"></i> redbusapp@gmail.com
                </p>
                <p>
                  <i className="uil uil-phone me-1"></i> 9182169738
                </p>
              </div>
            </div>

            <hr className="my-4"></hr>

            <div className="row">
              <div className="col-sm-6">
                <div className="text-muted">
                  <h5 className="font-size-16 mb-3">Billed To:</h5>
                  <h5 className="font-size-15 mb-2">{touristData && `${touristData.firstName} ${touristData.lastName}`}</h5>
                  <p className="mb-1">{touristData && touristData.email}</p>
                  <p>{touristData && touristData.phoneNumber}</p>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="text-muted text-sm-end">
                  <div className="mt-3">
                    <h5 className="font-size-15 mb-1">Invoice Date:</h5>
                    <h5>
                      <p>{date}</p>
                    </h5>
                  </div>
                  <div className="mt-4">
                    <h5 className="font-size-15 mb-1">Bus Name</h5>
                    <h5>
                      <p>{busData && busData.busName}</p>
                    </h5>
                  </div>
                  <div className="mt-4">
                    <h5 className="font-size-15 mb-1">Bus Number</h5>
                    <h5>
                      <p>{busData && busData.busNumber}</p>
                    </h5>
                  </div>
                </div>
              </div>
            </div>

            <div className="py-2">
              <h5 className="font-size-15">Booking Details</h5>
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-lg-4">
                          <div className="mb-3">
                            <h5 className="card-title">bookingId</h5>
                            <p>{billData && billData.bookingId}</p>
                          </div>
                          <div className="mb-3">
                            <h5 className="card-title">Source</h5>
                            <p>{busData && busData.source}</p>
                          </div>
                          <div className="mb-3">
                            <h5 className="card-title">Destination</h5>
                            <p>{busData && busData.destination}</p>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="mb-3">
                            <h5 className="card-title">Boarding Time</h5>
                            <p>{busData && busData.arrivalTime}</p>
                          </div>
                          <div className="mb-3">
                            <h5 className="card-title">Category</h5>
                            <p>{busData && busData.category}</p>
                          </div>
                          <div className="mb-3">
                            <h5 className="card-title">No.of Seats</h5>
                            <p>{billData && billData.numberOfSeats}</p>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="mb-3">
                            <h5 className="card-title">SeatNumbers</h5>
                            <p>{billData && billData.selectedSeat}</p>
                          </div>
                          <div className="mb-3">
                            <h5 className="card-title">Total Fare</h5>
                            <p>{billData && billData.totalFare}</p>
                          </div>
                          <div className="mb-3">
                            <h5 className="card-title">Status</h5>
                            <p>{billData && billData.status}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ paddingLeft: "110px" }}>
        <button className="btn btn-primary my-3" onClick={printReceipt} style={{ marginRight: "20px" }}>
          Print
        </button>
        <button className="btn btn-primary my-4" onClick={() => nav(-1)}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Receipt;
