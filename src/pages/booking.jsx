import React, { useState, useEffect } from 'react';
import '../styles/booking.css';

const Booking = () => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedHotel, setSelectedHotel] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');

  // Log state changes
  useEffect(() => {
    console.log('Form Data Updated:', {
      selectedLocation,
      selectedHotel,
      checkInDate,
      checkOutDate
    });
  }, [selectedLocation, selectedHotel, checkInDate, checkOutDate]);

  const locationData = {
    "Salem": ["The Grand Palace Hotel Salem", "Hotel Annapoorna Salem", "Lathika Residency"],
    "Namakkal": ["Hotel SSK Grand", "Hotel Vasantham", "Nala Hotels"],
    "Trichy": ["Grand Estancia - GRT Hotels", "Sangam Hotel Trichy", "Hotel Femina"],
    "Kodaikanal": ["Hotel Hemalaatha", "Kavitha Residency", "Hotel Green Park"],
    "Coimbatore": ["The Residency Towers Coimbatore", "Radisson Blu Hotel Coimbatore", "Vivanta Coimbatore"],
    "Rameshwaram": ["Hotel Radha Prasad", "Hotel Tamilnadu Rameshwaram (TTDC)", "SS Grand Inn"]
  };

  const handleLocationChange = (e) => {
    const location = e.target.value;
    console.log('Location selected:', location);
    setSelectedLocation(location);
    setSelectedHotel('');
  };

  const handleCheckAvailability = async () => {
    if (!selectedLocation || !selectedHotel || !checkInDate || !checkOutDate) {
      console.log('Validation failed:', {
        selectedLocation,
        selectedHotel,
        checkInDate,
        checkOutDate
      });
      alert('Please fill in all fields');
      return;
    }

    const requestData = {
      location: selectedLocation,
      hotel: selectedHotel,
      checkInDate,
      checkOutDate,
    };

    console.log('Sending request to backend:', requestData);

    try {
      const response = await fetch('https://trip-planner-backend-isxb.onrender.com/api/hotels/check-availability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      console.log('Response from backend:', data);

      if (data.available) {
        console.log('Rooms available:', data);
        alert('Rooms are available!');
      } else {
        console.log('No rooms available:', data);
        alert('No rooms available for the selected dates.');
      }
    } catch (error) {
      console.error('Error checking availability:', error);
      alert('Error checking availability. Please try again.');
    }
  };

  return (
    <div className="booking-container">
      <h1>Book Your Stay</h1>
      
      <div className="booking-form">
        <div className="form-group">
          <label htmlFor="location">Select Location:</label>
          <select 
            id="location"
            value={selectedLocation}
            onChange={handleLocationChange}
            className="select-input"
          >
            <option value="">-- Select a Location --</option>
            {Object.keys(locationData).map(location => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="hotel">Select Hotel:</label>
          <select
            id="hotel"
            value={selectedHotel}
            onChange={(e) => setSelectedHotel(e.target.value)}
            className="select-input"
            disabled={!selectedLocation}
          >
            <option value="">-- Select a Hotel --</option>
            {selectedLocation && locationData[selectedLocation].map(hotel => (
              <option key={hotel} value={hotel}>
                {hotel}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="checkIn">Check-in Date:</label>
          <input
            type="date"
            id="checkIn"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            className="date-input"
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className="form-group">
          <label htmlFor="checkOut">Check-out Date:</label>
          <input
            type="date"
            id="checkOut"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            className="date-input"
            min={checkInDate || new Date().toISOString().split('T')[0]}
          />
        </div>

        <button 
          className="check-availability-btn"
          onClick={handleCheckAvailability}
        >
          Check Availability
        </button>
      </div>
    </div>
  );
};

export default Booking;

