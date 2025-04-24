import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LocationGrid.css';

const locations = [
    { name: 'Salem', image: 'placeholder1.jpg' },
    { name: 'Namakkal', image: 'placeholder2.jpg' },
    { name: 'Trichy', image: 'placeholder3.jpg' },
    { name: 'Karur', image: 'placeholder4.jpg' },
    { name: 'Coimbatore', image: 'placeholder5.jpg' },
    { name: 'Erode', image: 'placeholder6.jpg' },
];

const LocationGrid = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    return (
        <div className="location-container">
            <div className="location-grid two-by-three">
                {locations.map((location, index) => (
                    <Link
                        to={`/location/${location.name.toLowerCase()}`}
                        className="location-card"
                        key={index}
                    >
                        <div className="image-placeholder">
                            <img
                                src={location.image}
                                alt={location.name}
                                className="placeholder-img"
                            />
                        </div>
                        <button className="location-button">{location.name}</button> {/* Changed to a button */}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default LocationGrid;