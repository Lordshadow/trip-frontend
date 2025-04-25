import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import locationData from '../data/locations.json';
import '../styles/booking.css';
import { getAuth } from "firebase/auth";

const HotelBooking = () => {
  const { hotelName } = useParams();
  const navigate = useNavigate();
  const [hotelDetails, setHotelDetails] = useState(null);
  const [checkInDate, setCheckInDate] = useState(new Date().toISOString().split('T')[0]);
  const [checkOutDate, setCheckOutDate] = useState('');
  const [roomCount, setRoomCount] = useState(1);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await fetch('https://trip-planner-backend-isxb.onrender.com/api/hotels/details', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ hotelName }),
        });

        const data = await response.json();
        if (data.success) {
          setHotelDetails(data.hotel);
        } else {
          alert('Failed to fetch hotel details.');
        }
      } catch (error) {
        console.error('Error fetching hotel details:', error);
        alert('An error occurred while fetching hotel details.');
      }
    };

    fetchHotelDetails();
  }, [hotelName]);

  const location = hotelDetails?.location || 'Default Location';

  const handleCheckAvailability = async () => {
    if (!location || !checkInDate || !checkOutDate || roomCount < 1) {
      alert('Please fill in all fields to check availability.');
      return;
    }

    const payload = {
      location, // Add location to the payload
      hotelName,
      checkIn: checkInDate, // Match the backend field names
      checkOut: checkOutDate,
      roomCount,
    };

    console.log('Payload being sent to backend:', payload);

    try {
      const response = await fetch('https://trip-planner-backend-isxb.onrender.com/api/hotels/check-availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log('Response from backend:', data);

      if (data && data.success && data.isAvailable) {
        alert('Rooms are available!');
      } else {
        alert(data.message || 'No rooms available for the selected dates.');
      }
    } catch (error) {
      console.error('Error checking availability:', error);
      alert('An error occurred while checking availability.');
    }
  };

  const handleBookNow = async () => {
    if (!checkInDate || !checkOutDate || roomCount < 1) {
      alert('Please fill in all fields.');
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;
    const firebaseUID = user ? user.uid : null;

    if (!firebaseUID) {
      alert("You must be logged in to book a hotel.");
      return;
    }

    const payload = {
      firebaseUID, // Dynamically fetched user ID
      hotel: hotelName,
      location,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      roomCount,
    };

    console.log('Payload being sent to backend for booking:', payload);

    try {
      const response = await fetch('https://trip-planner-backend-isxb.onrender.com/api/temp-bookings/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log('Response from backend for booking:', data);

      if (data.success) {
        alert('Booking successful!');
        navigate('/profile');
      } else {
        alert(data.message || 'Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Error booking hotel:', error);
      alert('An error occurred. Please try again.');
    }
  };

  if (!hotelDetails) {
    return <div className="loading">Loading hotel details...</div>;
  }

  return (
    <div className="hotel-booking-container">
      <h1>{hotelDetails.name}</h1>
      <img src={hotelDetails.image} alt={hotelDetails.name} className="hotel-image" />
      <p>{hotelDetails.description}</p>
      <div className="hotel-info">
        <p>Rating: {hotelDetails.rating} ★</p>
        <p>Price: {hotelDetails.price} per night</p>
      </div>

      <div className="booking-form">
        <label>Check-in Date:</label>
        <input
          type="date"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
        />

        <label>Check-out Date:</label>
        <input
          type="date"
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}
          min={checkInDate || new Date().toISOString().split('T')[0]}
        />

        <label>Number of Rooms:</label>
        <input
          type="number"
          value={roomCount}
          onChange={(e) => setRoomCount(Number(e.target.value))}
          min="1"
        />

        <button onClick={handleCheckAvailability}>Check Availability</button>
        <button onClick={handleBookNow}>Book Now</button>
      </div>
    </div>
  );
};

export default HotelBooking;