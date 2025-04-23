import React from "react";
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from "react-bootstrap";
import "../styles/roombooking.css";

const RoomBookingPage = () => {
  const rooms = [
    {
      id: 1,
      name: "Ocean View Suite",
      description: "Spacious suite with breathtaking ocean views and a private balcony.",
      image: "https://media.vrbo.com/lodging/33000000/32630000/32624800/32624730/258ef14a.jpg?impolicy=resizecrop&rw=1200&ra=fit",
      price: "350 Pre Day",
      amenities: ["King bed", "Private balcony", "Ocean view", "Free Wi-Fi", "Air conditioning"],
    },
    {
      id: 2,
      name: "Beachfront Villa",
      description: "Luxurious villa with direct beach access and a private plunge pool.",
      image: "https://www.ministryofvillas.com/wp-content/uploads/2019/07/bali-thebeachvillacemagi-31.jpg",
      price: "550 Per Day",
      amenities: ["King bed", "Private plunge pool", "Beach access", "Full kitchen", "Butler service (optional)"],
    },
    {
      id: 3,
      name: "Overwater Bungalow",
      description: "Secluded bungalow suspended over the crystal-clear lagoon.",
      image: "https://media.houseandgarden.co.uk/photos/6204eec547f811e6e7d1509d/16:9/w_1920%2Cc_limit/Stella_Maris_Exterior.jpg",
      price: "700 Per Day",
      amenities: ["King bed", "Private deck with lagoon access", "Glass-bottom floor", "Outdoor shower","Full kitchen"],
    },
  ];

  return (
    <div className="room-booking-page">
      <div className="hero-section">
        <h1>Book Your Dream Room</h1>
        <p>Discover our exquisite selection of rooms and suites for an unforgettable stay.</p>
      </div>

      <Container className="room-list">
        <Row xs={1} md={2} lg={3} className="g-4">
          {rooms.map((room) => (
            <Col key={room.id}>
              <Card className="room-card">
                <Card.Img variant="top" src={room.image} alt={room.name} className="room-image" />
                <Card.Body className="room-details">
                  <Card.Title>{room.name}</Card.Title>
                  <Card.Text className="room-description">{room.description}</Card.Text>
                  <div className="room-amenities">
                    <strong>Amenities:</strong>
                    <ul>
                      {room.amenities.map((amenity, index) => (
                        <li key={index}>{amenity}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="room-price">
                    <strong>Price per night:</strong> ${room.price}
                  </div>
                  <Link to={`/book/${room.id}`} className="btn btn-primary">
                    Book Now
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default RoomBookingPage;
