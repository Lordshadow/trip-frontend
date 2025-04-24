import React from "react";
import { useLocation, useParams } from "react-router-dom";

const VehicleDetails = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const vehicle = state || {};

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{vehicle.name || `Vehicle ID: ${id}`}</h1>
      <img src={vehicle.image} alt={vehicle.name} style={{ maxWidth: "400px" }} />
      <p><strong>Capacity:</strong> {vehicle.capacity}</p>
      <p><strong>Description:</strong> A great choice for {vehicle.capacity?.toLowerCase()}!</p>
    </div>
  );
};

export default VehicleDetails;
