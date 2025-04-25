import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import locationData from '../data/locations.json';
import '../styles/booking.css';

const HotelBooking = () => {
  const { hotelName } = useParams();
  const navigate = useNavigate();
  const [hotelDetails, setHotelDetails] = useState(null);
  const [checkInDate, setCheckInDate] = useState('');
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

  const handleBookNow = async () => {
    if (!checkInDate || !checkOutDate || roomCount < 1) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('https://trip-planner-backend-isxb.onrender.com/api/tempHotelBooking/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hotelName,
          checkInDate,
          checkOutDate,
          roomCount,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Booking successful!');
        navigate('/profile');
      } else {
        alert('Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Error booking hotel:', error);
      alert('An error occurred. Please try again.');
    }
  };

  if (!hotelDetails) {
    return <div>Loading hotel details...</div>;
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

        <button onClick={handleBookNow}>Book Now</button>
      </div>
    </div>
  );
};

export default HotelBooking;