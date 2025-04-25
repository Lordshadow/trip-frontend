// VehicleDetails.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth"; // Firebase Auth
import "../styles/VehicleDetails.css";

const VehicleDetails = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const vehicle = state || {};

  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [availabilityMessage, setAvailabilityMessage] = useState(null);
  const [availableVehicles, setAvailableVehicles] = useState([]);
  const [selectedVehicleNames, setSelectedVehicleNames] = useState([]);
  const [days, setDays] = useState(0);
  const [bookingStatus, setBookingStatus] = useState(null);
  const [selectedVehicleRate, setSelectedVehicleRate] = useState(null);

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

    const vehicleId = vehicle.vehicleId || id; // Fallback to id from useParams

    try {
      console.log("Sending data to backend:", {
        vehicleId,
        pickupDate,
        returnDate,
      });

      const response = await fetch("https://trip-planner-backend-isxb.onrender.com/api/vehicles/check-availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vehicleId,
          pickupDate,
          returnDate,
        }),
      });

      const data = await response.json();
      console.log("Response from backend:", data);

      if (data.isAvailable) {
        setAvailabilityMessage(`${data.availableVehicles.length} vehicle(s) available:`);
        setAvailableVehicles(data.availableVehicles);
      } else {
        setAvailabilityMessage("Not Available for these dates.");
        setAvailableVehicles([]);
      }
    } catch (error) {
      console.error("Error checking availability:", error);
      setAvailabilityMessage("Error checking availability.");
      setAvailableVehicles([]);
    }
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedVehicleNames((prev) => [...prev, value]);
      const selectedVehicle = availableVehicles.find((v) => v.name === value);
      if (selectedVehicle) {
        setSelectedVehicleRate(selectedVehicle.dailyRate);
      }
    } else {
      setSelectedVehicleNames((prev) => prev.filter((name) => name !== value));
      if (selectedVehicleNames.filter((name) => name !== value).length === 0) {
        setSelectedVehicleRate(null);
      } else {
        // If other vehicles are still selected, update to the rate of the first remaining
        const firstSelectedName = selectedVehicleNames.filter((name) => name !== value)[0];
        const firstSelectedVehicle = availableVehicles.find((v) => v.name === firstSelectedName);
        setSelectedVehicleRate(firstSelectedVehicle ? firstSelectedVehicle.dailyRate : null);
      }
    }
  };

  const handleBookNow = async () => {
    if (selectedVehicleNames.length === 0) {
      alert("Please select at least one vehicle to book.");
      return;
    }
  
    if (!pickupDate || !returnDate) {
      alert("Please select rental dates.");
      return;
    }
  
    const auth = getAuth();
    const user = auth.currentUser;
  
    if (!user) {
      alert("You must be logged in to book a vehicle.");
      return;
    }
  
    const firebaseUID = user.uid;
    const vehicleName = selectedVehicleNames[0]; // Only one vehicle booked at a time
    const vehicleId = vehicle.vehicleId || id;   // Use fallback like in checkAvailability
  
    if (!vehicleId || !vehicleName || !pickupDate || !returnDate) {
      alert("Missing booking information.");
      return;
    }
  
    try {
      const response = await fetch("https://trip-planner-backend-isxb.onrender.com/api/temp-bookings/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firebaseUID,
          vehicleId,
          vehicleName,
          pickupDate,
          returnDate,
        }),
      });
  
      const data = await response.json();
  
      if (response.status === 201) {
        setBookingStatus(`Temporary booking created for ${vehicleName}`);
      } else if (response.status === 409) {
        setBookingStatus(data.message);
      } else {
        setBookingStatus(`Error: ${data.message || "Could not create temporary booking"}`);
      }
    } catch (error) {
      console.error("Error creating temporary booking:", error);
      setBookingStatus("Error creating temporary booking.");
    }
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

        {availabilityMessage && (
          <div className="availability-result">
            <p>{availabilityMessage}</p>
            {availableVehicles.length > 0 && (
              <div>
                <h3>Available Vehicles:</h3>
                {availableVehicles.map((v, index) => (
                  <div key={`${v.name}-${index}`}>
                    <input
                      type="checkbox"
                      value={v.name}
                      onChange={handleCheckboxChange}
                    />
                    <label>{v.name} (₹{v.dailyRate}/day)</label>
                  </div>
                ))}
                {selectedVehicleNames.length > 0 && (
                  <button className="book-button" onClick={handleBookNow}>Book Now</button>
                )}
              </div>
            )}
          </div>
        )}

        {bookingStatus && (
          <div className="booking-status">
            <p>{bookingStatus}</p>
          </div>
        )}
      </div>

      <div className="booking-summary">
        <h2>Booking Summary</h2>
        <h3>{vehicle.name || `Vehicle ID: ${id}`}</h3>
        <img src={vehicle.image} alt={vehicle.name || "Vehicle"} className="vehicle-image" />
        <p>🚗 {vehicle.type} • {vehicle.capacity} seats</p>
        <p>⭐ 4.5</p>
        {pickupDate && returnDate && (
          <div className="date-summary">
            <p>📅 <strong>From:</strong> {pickupDate}</p>
            <p>📅 <strong>To:</strong> {returnDate}</p>
            <p>🕓 <strong>Total Days:</strong> {days}</p>
            {selectedVehicleRate ? (
              <>
                <p>💰 <strong>Daily Rate:</strong> ₹{selectedVehicleRate}</p>
                {days > 0 && (
                  <p>💰 <strong>Estimated Total:</strong> ₹{days * selectedVehicleRate}</p>
                )}
              </>
            ) : (
              <p>💰 <strong>Daily Rate:</strong> Not selected</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleDetails;
