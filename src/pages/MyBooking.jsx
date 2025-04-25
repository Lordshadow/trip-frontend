import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import '../styles/mybooking.css';

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) {
        alert('You must be logged in to view your bookings.');
        return;
      }

      try {
            const response = await fetch(`https://trip-planner-backend-isxb.onrender.com/api/hotels/temp-bookings/${user.uid}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();
        if (data.success) {
          setBookings(data.bookings);
        } else {
          alert('Failed to fetch bookings.');
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
        alert('An error occurred while fetching your bookings.');
      }
    };

    fetchBookings();
  }, [user]);

  if (!user) {
    return <div>Please log in to view your bookings.</div>;
  }

  return (
    <div className="my-booking-container">
      <h1>My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="booking-list">
          {bookings.map((booking, index) => (
            <div key={index} className="booking-card">
              <h3>{booking.hotelName}</h3>
              <p>Location: {booking.location}</p>
              <p>Check-in: {booking.checkInDate}</p>
              <p>Check-out: {booking.checkOutDate}</p>
              <p>Rooms: {booking.roomCount}</p>
              <button className="pay-button">Pay</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBooking;