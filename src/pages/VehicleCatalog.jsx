import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/VehicleCatalog.css";

const vehicles = [
  { id: 1, name: "Sedan", image: "https://via.placeholder.com/300x200", capacity: "5 Passengers", description: "A comfortable sedan for city commutes and small families." },
  { id: 2, name: "SUV", image: "https://via.placeholder.com/300x200", capacity: "7 Passengers", description: "A spacious SUV perfect for families and adventurous trips." },
  { id: 3, name: "Van", image: "https://via.placeholder.com/300x200", capacity: "12 Passengers", description: "Ideal for larger groups and airport transfers." },
  { id: 4, name: "Mini Bus", image: "https://via.placeholder.com/300x200", capacity: "20 Passengers", description: "Suitable for medium-sized groups and tours." },
  { id: 5, name: "Mid-size Bus", image: "https://via.placeholder.com/300x200", capacity: "30 Passengers", description: "Comfortable bus for city tours and group travel." },
  { id: 6, name: "Luxury Bus", image: "https://via.placeholder.com/300x200", capacity: "54 Passengers", description: "Premium bus with enhanced comfort for long journeys." },
];

const VehicleCatalog = () => {
  const navigate = useNavigate();

  const handleViewDetails = (vehicle) => {
    navigate(`/vehicles/${vehicle.id}`, { state: vehicle });
  };

  return (
    <div className="vehicle-catalog-container">
      <header className="catalog-header">
        <h1 className="catalog-title">Explore Our Fleet</h1>
      </header>
      <div className="vehicle-grid two-by-three">
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="vehicle-card animated-card">
            <div
              onClick={() => handleViewDetails(vehicle)}
              className="vehicle-image-link animated-image-link"
              style={{ cursor: 'pointer' }}
            >
              <img
                src={vehicle.image}
                alt={vehicle.name}
                className="vehicle-image animated-image"
              />
            </div>
            <div className="vehicle-info animated-info">
              <h2 className="vehicle-capacity">{vehicle.name}</h2>
              <p className="vehicle-capacity-text">{vehicle.capacity}</p>
              <button
                onClick={() => handleViewDetails(vehicle)}
                className="view-button animated-button"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleCatalog;