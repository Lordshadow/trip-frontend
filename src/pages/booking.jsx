import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../styles/booking.css';

const Booking = () => {
  const { id: roomId } = useParams(); // Get roomId from URL
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [roomType, setRoomType] = useState('standard');
  const [isCouple, setIsCouple] = useState(false);
  const [foodPreference, setFoodPreference] = useState('both');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalGuests = adults + children;

    let roomCapacityMessage = '';
    if (roomType === 'standard' && totalGuests > 4) {
      roomCapacityMessage = 'Standard rooms are suitable for up to 4 persons.';
    } else if (roomType === 'villa' && totalGuests > 10) {
      roomCapacityMessage = 'Villas are suitable for up to 10 persons.';
    } else if (roomType === 'bungalow' && totalGuests > 25) {
      roomCapacityMessage = 'Bungalows are suitable for up to 25 persons.';
    }

    if (roomCapacityMessage) {
      alert(roomCapacityMessage);
      return;
    }

    const bookingData = {
      roomId, // Now correctly included
      checkInDate,
      checkOutDate,
      adults,
      children,
      roomType,
      isCouple,
      foodPreference,
      name,
      email,
      phone,
    };

    console.log('Booking Data:', bookingData);
    alert(`Booking request submitted for Room ID: ${roomId} `);
  };

  return (
    <div className="booking-page">
      <div className="booking-hero">
        <div className="hero-overlay">
          <Container className="hero-content text-center">
            <h1>Book Your Stay</h1>
            <p className="lead">We look forward to welcoming you to Paradise Resort!</p>
          </Container>
        </div>
      </div>

      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <div className="booking-form">
              <h2 className="mb-4">Enter Your Booking Details</h2>
              <p><strong>Room ID:</strong> {roomId}</p> {/* Displaying the Room ID */}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formCheckInDate">
                  <Form.Label>Check-in Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCheckOutDate">
                  <Form.Label>Check-out Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formRoomType">
                  <Form.Label>Room Type</Form.Label>
                  <Form.Control
                    as="select"
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                  >
                    <option value="standard">Standard (Up to 4 Persons)</option>
                    <option value="villa">Villa (Up to 10 Persons)</option>
                    <option value="bungalow">Bungalow (Up to 25 Persons)</option>
                  </Form.Control>
                </Form.Group>

                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="formAdults">
                    <Form.Label>Adults</Form.Label>
                    <Form.Control
                      type="number"
                      min="1"
                      value={adults}
                      onChange={(e) => setAdults(parseInt(e.target.value))}
                      required
                    />
                  </Form.Group>

                  <Form.Group as={Col} md="6" controlId="formChildren">
                    <Form.Label>Children</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      value={children}
                      onChange={(e) => setChildren(parseInt(e.target.value))}
                    />
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formIsCouple">
                  <Form.Check
                    type="checkbox"
                    label="Couple (May incur extra charges upto 45%)"
                    checked={isCouple}
                    onChange={(e) => setIsCouple(e.target.checked)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formFoodPreference">
                  <Form.Label>Food Preference (Breakfast and Dinner Included)</Form.Label>
                  <Form.Control
                    as="select"
                    value={foodPreference}
                    onChange={(e) => setFoodPreference(e.target.value)}
                  >
                    <option value="both">Vegetarian & Non-Vegetarian</option>
                    <option value="vegetarian">Vegetarian Only</option>
                    <option value="non-vegetarian">Non-Vegetarian Only</option>
                  </Form.Control>
                </Form.Group>

                <h3 className="mt-4 mb-3">Contact Information</h3>

                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPhone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Complete Booking
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Booking; 