// VehicleDetails.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import "../styles/VehicleDetails.css";

const VehicleDetails = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const vehicle = state || {};

  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [availability, setAvailability] = useState(null);
  const [count, setCount] = useState(0);
  const [days, setDays] = useState(0);

  useEffect(() => {
    if (pickupDate && returnDate) {
      const pickup = new Date(pickupDate);
      const returnD = new Date(returnDate);
      const timeDiff = returnD - pickup;
      const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      setDays(daysDiff > 0 ? daysDiff : 0);
    } else {
      setDays(0);
    }
  }, [pickupDate, returnDate]);

  const checkAvailability = async () => {
    if (!pickupDate || !returnDate) {
      alert("Please select both pickup and return dates.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/vehicles/check-availability/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pickupDate, returnDate }),
      });

      const data = await response.json();
      setAvailability(data.available);
      setCount(data.count);
    } catch (error) {
      console.error("Error checking availability:", error);
    }
  };

  const handleBookNow = () => {
    localStorage.setItem("vehicleBooking", JSON.stringify({
      vehicleId: id,
      pickupDate,
      returnDate,
    }));
    navigate("/booking");
  };

  return (
    <div className="vehicle-container">
      <div className="vehicle-info">
        <h1 className="title">Booking Information</h1>
        <p className="subtitle">Please select your rental dates to check availability</p>

        <div className="section">
          <h2>Rental Details</h2>
          <label>Pickup Date</label>
          <input type="date" className="input" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} />
          <label>Return Date</label>
          <input type="date" className="input" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
        </div>

        <button className="check-button" onClick={checkAvailability}>Check Availability</button>

        {availability !== null && (
          <div className="availability-result">
            {availability ? (
              <>
                <p>{count} vehicle(s) available</p>
                <button className="book-button" onClick={handleBookNow}>Book Now</button>
              </>
            ) : (
              <p className="not-available">Not Available</p>
            )}
          </div>
        )}
      </div>

      <div className="booking-summary">
        <h2>Booking Summary</h2>
        <h3>{vehicle.name || `Vehicle ID: ${id}`}</h3>
        <img src={vehicle.image} alt={vehicle.name} className="vehicle-image" />
        <p>🚗 {vehicle.type} • {vehicle.capacity} seats</p>
        <p>⭐ 4.5</p>
        {pickupDate && returnDate && (
          <div className="date-summary">
            <p>📅 <strong>From:</strong> {pickupDate}</p>
            <p>📅 <strong>To:</strong> {returnDate}</p>
            <p>🕓 <strong>Total Days:</strong> {days}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleDetails;
