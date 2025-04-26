import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TextField, Button } from '@mui/material';
import dayjs from 'dayjs';
import '../styles/LocationDetails.css';
import locationData from '../data/locations.json';
import { getAuth } from "firebase/auth";

const LocationDetails = () => {
    const { locationName } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('overview');
    const [currentLocationData, setCurrentLocationData] = useState(null);
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [availableHotels, setAvailableHotels] = useState([]);
    const [selectedRooms, setSelectedRooms] = useState({});
    const [priceMap, setPriceMap] = useState({});
    const reviewsContainerRef = useRef(null);
    const tabIndicatorRef = useRef(null);

    useEffect(() => {
        const foundLocation = locationData.find(loc => loc.name.toLowerCase() === locationName.toLowerCase());
        setCurrentLocationData(foundLocation);
    }, [locationName]);

    useEffect(() => {
        const container = reviewsContainerRef.current;
        if (!container || !currentLocationData?.reviews) return;

        const scrollAmount = 1;
        const scrollDelay = 20;

        const autoScroll = () => {
            if (container.scrollLeft >= container.scrollWidth / 2) {
                container.scrollLeft = 0;
            } else {
                container.scrollLeft += scrollAmount;
            }
        };

        const interval = setInterval(autoScroll, scrollDelay);

        return () => clearInterval(interval);
    }, [currentLocationData?.reviews]);

    useEffect(() => {
        if (location.pathname.includes('/hotels')) {
            setActiveTab('hotels');
        } else if (location.pathname.includes('/vehicles')) {
            setActiveTab('vehicles');
        } else if (location.pathname.includes('/photos')) {
            setActiveTab('photos');
        } else {
            setActiveTab('overview');
        }
    }, [location.pathname]);

    useEffect(() => {
        if (tabIndicatorRef.current) {
            const activeTabElement = document.querySelector(`.main-content-tabs .tab.active`);
            if (activeTabElement) {
                tabIndicatorRef.current.style.width = `${activeTabElement.offsetWidth}px`;
                tabIndicatorRef.current.style.left = `${activeTabElement.offsetLeft}px`;
            }
        }
    }, [activeTab]);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        if (tab === 'vehicles') {
            navigate('/vehicles');
        }
    };

    const handleViewHotelDetailsClick = () => {
        setActiveTab('hotels');
    };

    const handleCheckAvailability = async () => {
        if (!checkInDate || !checkOutDate) {
            alert("Please select both check-in and check-out dates.");
            return;
        }

        try {
            const response = await fetch('https://trip-planner-backend-isxb.onrender.com/api/hotel/check-availability', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    location: locationName,
                    checkIn: checkInDate,
                    checkOut: checkOutDate
                })
            });

            const data = await response.json();
            if (data.isAvailable) {
                setAvailableHotels(data.availableHotels);
            } else {
                setAvailableHotels([]);
                alert("No rooms available for selected dates.");
            }
        } catch (error) {
            console.error("Error checking availability:", error);
        }
    };

    const handleRoomSelection = (hotelName, count, rate) => {
        setSelectedRooms(prev => ({ ...prev, [hotelName]: count }));
        setPriceMap(prev => ({
            ...prev,
            [hotelName]: rate * count * dayjs(checkOutDate).diff(checkInDate, 'day')
        }));
    };

    const getTotalPrice = (hotelName) => {
        return priceMap[hotelName] || 0;
    };

    const handleTempBook = async (hotelName) => {
        if (!selectedRooms[hotelName]) {
            alert("Please choose a room first.");
            return;
        }

        const auth = getAuth();
        const user = auth.currentUser;
        const firebaseUID = user ? user.uid : null;

        if (!firebaseUID) {
            alert("You must be logged in to book a hotel.");
            return;
        }

        try {
            const response = await fetch('https://trip-planner-backend-isxb.onrender.com/api/temp-book', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firebaseUID: firebaseUID,
                    hotel: hotelName,
                    location: locationName,
                    checkIn: checkInDate,
                    checkOut: checkOutDate
                })
            });

            const data = await response.json();
            alert(data.message || "Temporary booking created!");
        } catch (err) {
            console.error(err);
            alert("Booking failed.");
        }
    };

    const handleBookNow = (hotelName) => {
        navigate(`/booking/${hotelName}`);
    };

    if (!currentLocationData) {
        return <div>Loading location details for {locationName}...</div>;
    }

    const { name, country, rating, reviewCount, touristSpotsCount, description, image, bestTimeToVisit, reviews, hotels, touristSpots, photos } = currentLocationData;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="location-details-page">
                <div className="hero-section" style={{ backgroundImage: `url(${image})` }}>
                    <div className="gradient-overlay"></div>
                    <div className="hero-content">
                        <h1 className="location-name">{name}, {country}</h1>
                        <div className="rating">
                            <span className="star">★</span> {rating} ({reviewCount} reviews) - {touristSpotsCount} tourist spots
                        </div>
                        <p className="description">{description}</p>
                    </div>
                </div>

            

                <div className="main-content-tabs">
                    <button className={`tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => handleTabClick('overview')}>Overview</button>
                    <button className={`tab ${activeTab === 'hotels' ? 'active' : ''}`} onClick={() => handleTabClick('hotels')}>Hotels</button>
                    <button className={`tab ${activeTab === 'vehicles' ? 'active' : ''}`} onClick={() => handleTabClick('vehicles')}>Vehicles</button>
                    <button className={`tab ${activeTab === 'photos' ? 'active' : ''}`} onClick={() => handleTabClick('photos')}>Photos & Reviews</button>
                    <div ref={tabIndicatorRef} className="tab-indicator"></div>
                </div>


             {activeTab === 'overview' && (
                                <div className="overview-tab-content">
                                    <div className="main-content">
                                        <h2>About {name}</h2>
                                        <p>{description}</p>
            
                                        <h3>Top Tourist Spots</h3>
                                        <div className="tourist-spots-grid">
                                            {touristSpots && touristSpots.map((spot, index) => (
                                                <div key={index} className="tourist-spot-card">
                                                    <div className="spot-image-placeholder">
                                                        <img src={spot.image} alt={spot.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                    </div>
                                                    <div className="spot-name">{spot.name}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="sidebar">
                                        <div className="location-info-card">
                                            <h3>{name} Information</h3>
                                            <p><span className="icon">📍</span> {name}, {country}</p>
                                            <p><span className="icon">★</span> Rating: {rating}</p>
                                            <p>Best time to visit: {bestTimeToVisit}</p>
                                        </div>
            
                                        <div className="featured-hotel-card">
                                            <h3>Featured Hotels</h3>
                                            {hotels && hotels.slice(0, 3).map((hotel, index) => (
                                                <div key={index} className="hotel-item">
                                                    <img src={hotel.image} alt={hotel.name} className="hotel-image" />
                                                    <div className="hotel-details">
                                                        <h4>{hotel.name}</h4>
                                                        <p className="description-small">{hotel.description}</p>
                                                        <div className="rating">Rating: {hotel.rating} <span className="star">★</span></div>
                                                        <p className="price">Starting from {hotel.price}</p>
                                                        <Button variant="outlined" color="primary" size="small" onClick={handleViewHotelDetailsClick}>
                                                            View Details
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
            


                {activeTab === 'hotels' && (
                                    <div className="hotels-tab-content">
                                        <h2>Hotels in {name}</h2>
                                        <div className="hotel-grid">
                                            {hotels && hotels.map((hotel, index) => (
                                                <div key={index} className="hotel-card">
                                                    <img src={hotel.image} alt={hotel.name} className="hotel-image-large" />
                                                    <div className="hotel-info">
                                                        <h3>{hotel.name}</h3>
                                                        <p className="description">{hotel.description}</p>
                                                        <div className="rating">Rating: {hotel.rating} <span className="star">★</span></div>
                                                        <p className="price">Starting from {hotel.price}</p>
                                                        <button onClick={() => handleBookNow(hotel.name)} className="book-now-btn">Book Now</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}


                            {activeTab === 'photos' && (
                                <div className="photos-tab-content">
                                    <h2>Photos & Reviews of {name}</h2>
                                    <div className="photos-reviews-grid">
                                        {photos && photos.map((item, index) => (
                                            <img key={index} src={item} alt={`Photo ${index + 1}`} className="photo-review-item" />
                                        ))}
                                    </div>
            
                                    {reviews && reviews.length > 0 && (
                                        <section className="traveler-reviews-section">
                                            <h2>What Our Travelers Say</h2>
                                            <p className="reviews-intro">Read reviews from travelers who have experienced our services firsthand.</p>
                                            <div className="reviews-scrolling-container" ref={reviewsContainerRef}>
                                                <div className="reviews-grid scrolling">
                                                    {[...reviews, ...reviews].map((review, index) => (
                                                        <div key={index} className="review-card scrolling-item">
                                                            <div className="rating">
                                                                {[...Array(review.rating)].map((_, i) => (
                                                                    <span key={i} className="star">★</span>
                                                                ))}
                                                                {[...Array(5 - review.rating)].map((_, i) => (
                                                                    <span key={`empty-${i}`} className="empty-star">☆</span>
                                                                ))}
                                                            </div>
                                                            <p className="review-text">"{review.text}"</p>
                                                            <div className="author-info">
                                                                <img src={review.avatar} alt={review.author} className="author-avatar" />
                                                                <div className="author-details">
                                                                    <h4 className="author-name">{review.author}</h4>
                                                                    <p className="author-location">{review.location} - {review.date}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="read-all-reviews">
                                                <Button variant="outlined" color="primary" endIcon={<span className="arrow-right">→</span>}>
                                                    Read All Reviews
                                                </Button>
                                            </div>
                                        </section>
                                    )}
                                    {reviews && reviews.length === 0 && (
                                        <p>No reviews available for {name} yet.</p>
                                    )}
                                </div>
                            )}
            </div>
        </LocalizationProvider>
    );
};

export default LocationDetails;
