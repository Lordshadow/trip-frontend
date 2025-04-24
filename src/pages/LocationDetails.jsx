import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TextField, Button } from '@mui/material';
import dayjs from 'dayjs';
import '../styles/LocationDetails.css'; // Import the new CSS

const LocationDetails = () => {
    const { locationName } = useParams();

    // Placeholder data - replace with actual data fetching
    const locationData = {
        name: locationName,
        country: 'India', // Replace with actual country
        rating: 4.5, // Replace with actual rating
        reviewCount: 125, // Replace with actual review count
        touristSpotsCount: 8, // Replace with actual count
        description: `Experience the vibrant culture and beauty of ${locationName}. Discover historical landmarks, scenic landscapes, and delicious cuisine in this wonderful destination.`, // Replace with actual description
        image: '/images/location-placeholder-large.jpg', // Large hero image
        bestTimeToVisit: 'October to March', // Replace with actual info
    };

    const featuredHotels = [
        { name: 'Cozy Inn', rating: 4.2, price: '₹2500', image: '/images/hotel-placeholder1.jpg' },
        { name: 'Grand Suites', rating: 4.8, price: '₹5500', image: '/images/hotel-placeholder2.jpg' },
        // Add more featured hotels
    ];

    const touristSpots = [
        'Historical Site A',
        'Scenic Viewpoint B',
        'Local Market C',
        // Add more tourist spots
    ];

    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="location-details-page">
                {/* Hero Section */}
                <div className="hero-section" style={{ backgroundImage: `url(${locationData.image})` }}>
                    <div className="gradient-overlay"></div>
                    <div className="hero-content">
                        <h1 className="location-name">{locationData.name}, {locationData.country}</h1>
                        <div className="rating">
                            <span className="star">&#9733;</span> {locationData.rating} ({locationData.reviewCount} reviews) - {locationData.touristSpotsCount} tourist spots
                        </div>
                        <p className="description">{locationData.description}</p>
                    </div>
                </div>

                {/* Date Selection Bar */}
                <div className="date-selection-bar">
                    <h3 className="location-name-small">{locationData.name}</h3>
                    <DatePicker
                        label="Check-in"
                        value={checkInDate}
                        onChange={(date) => setCheckInDate(date)}
                        renderInput={(params) => <TextField {...params} size="small" />}
                    />
                    <DatePicker
                        label="Check-out"
                        value={checkOutDate}
                        onChange={(date) => setCheckOutDate(date)}
                        renderInput={(params) => <TextField {...params} size="small" />}
                    />
                    <Button variant="contained" color="primary" className="check-availability-button">
                        Check Availability
                    </Button>
                </div>

                {/* Main Content Tabs (Placeholder for future) */}
                <div className="main-content-tabs">
                    <button className="tab active">Overview</button>
                    <button className="tab">Hotels</button>
                    <button className="tab">Vehicles</button>
                    <button className="tab">Photos</button>
                </div>

                {/* Overview Tab Content */}
                <div className="overview-tab-content">
                    <div className="main-content">
                        <h2>About {locationData.name}</h2>
                        <p>{locationData.description}</p>

                        <h3>Top Tourist Spots</h3>
                        <div className="tourist-spots-grid">
                            {touristSpots.map((spot, index) => (
                                <div key={index} className="tourist-spot-card">
                                    {/* Placeholder for image */}
                                    <div className="spot-image-placeholder"></div>
                                    <div className="spot-name">{spot}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="sidebar">
                        <div className="location-info-card">
                            <h3>{locationData.name} Information</h3>
                            <p><span className="icon">&#128205;</span> {locationData.name}, {locationData.country}</p>
                            <p><span className="icon">&#9733;</span> Rating: {locationData.rating}</p>
                            <p>Best time to visit: {locationData.bestTimeToVisit}</p>
                        </div>

                        <div className="featured-hotel-card">
                            <h3>Featured Hotel</h3>
                            {featuredHotels.map((hotel, index) => (
                                <div key={index} className="hotel-item">
                                    <img src={hotel.image} alt={hotel.name} className="hotel-image" />
                                    <div className="hotel-details">
                                        <h4>{hotel.name}</h4>
                                        <div className="rating">Rating: {hotel.rating} <span className="star">&#9733;</span></div>
                                        <p className="price">Starting from {hotel.price}</p>
                                        <Button variant="outlined" color="primary" size="small">View & Book</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Hotels Tab Content (Placeholder) */}
                <div className="hotels-tab-content">
                    {/* Sorting options and hotel grid will go here */}
                </div>

                {/* Vehicles Tab Content (Placeholder) */}
                <div className="vehicles-tab-content">
                    {/* Sorting options and vehicle grid will go here */}
                </div>

                {/* Photos Tab Content (Placeholder) */}
                <div className="photos-tab-content">
                    {/* Masonry grid gallery will go here */}
                </div>
            </div>
        </LocalizationProvider>
    );
};

export default LocationDetails;