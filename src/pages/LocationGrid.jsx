import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LocationGrid.css';
import salem from'../assets/salem.jpg';
import kolli from'../assets/kolli.jpg';
import trichy from'../assets/kallanai.jpg';
import kodai from'../assets/kodai.jpg';
import kovai from'../assets/coimbatore.jpg';
import ram from'../assets/ram.jpg';

const locations = [
    { name: 'Salem', image: salem },
    { name: 'Namakkal', image: kolli },
    { name: 'Trichy', image: trichy },
    { name: 'Kodaikanal', image: kodai },
    { name: 'Coimbatore', image: kovai },
    { name: 'Rameshwaram', image: ram },
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