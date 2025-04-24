import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/about.css";
import "../styles/styles.css";
import environmentImage from "../assets/environment.jpg";
import advantageImage from "../assets/advantage.jpg";
import foodImage from "../assets/food.jpg";
import serviceImage from "../assets/service.jpg";
import spa from "../assets/spa.jpg";
import policyImage from "../assets/policy.jpg";

const AboutUsContent = () => {
  return (
    <div className="about-us-page">
      <div className="parallax" style={{ backgroundImage: `url(${environmentImage})` }}>
        <div className="fade-in">
          <h1>About Us</h1>
          <p>Learn more about our mission and values</p>
        </div>
      </div>
      <div className="tint">
        <div className="contentwrapper">
          <Container className="py-5">
            <Row className="mb-5 align-items-center">
              <Col md={6} className="order-md-2">
                <img src={environmentImage} alt="Explore Scenic Destinations with TripTack Tix" className="img-fluid rounded shadow-sm" />
              </Col>
              <Col md={6} className="order-md-1">
                <h2>Discover Stunning Environments with TripTack Tix</h2>
                <p>At TripTack Tix, we invite you to explore the most breathtaking environments our world has to offer. From serene natural landscapes to vibrant cityscapes, we curate journeys that immerse you in the beauty and diversity of our planet. Let us guide you to unforgettable destinations where the scenery itself becomes a cherished memory.</p>
              </Col>
            </Row>

            <Row className="mb-5 align-items-center">
              <Col md={6}>
                <img src={advantageImage} alt="The TripTack Tix Advantage for Your Journey" className="img-fluid rounded shadow-sm" />
              </Col>
              <Col md={6}>
                <h2>The TripTack Tix Advantage for Your Journey</h2>
                <p>Choosing TripTack Tix means unlocking a world of seamless and enriching travel experiences. Here's what sets us apart as your trusted travel companion:</p>
                <ul>
                  <li><strong>Curated Travel Options:</strong> We carefully select a wide range of flights, accommodations, and activities to suit every travel style and budget.</li>
                  <li><strong>Effortless Planning:</strong> Our intuitive platform makes it easy to search, compare, and book your entire trip in one place.</li>
                  <li><strong>Dedicated Support Team:</strong> Our knowledgeable team is here to assist you before, during, and after your travels, ensuring a stress-free experience.</li>
                  <li><strong>Exclusive Deals and Offers:</strong> Benefit from our partnerships to access special rates and unique travel packages.</li>
                  <li><strong>Your Journey, Your Way:</strong> We empower you to customize your itinerary and create a travel experience that's perfectly tailored to your preferences.</li>
                  <li><strong>Reliable and Secure Bookings:</strong> Trust in our secure booking system and our commitment to your peace of mind.</li>
                </ul>
              </Col>
            </Row>

            <Row className="mb-5 align-items-center">
              <Col md={6} className="order-md-2">
                <img src={foodImage} alt="Savor Local Flavors on Your Trip with TripTack Tix" className="img-fluid rounded shadow-sm" />
              </Col>
              <Col md={6} className="order-md-1">
                <h2>Savor Local Flavors on Your Trip with TripTack Tix</h2>
                <p>Embark on a culinary adventure with TripTack Tix and discover the authentic tastes of your destinations. From street food delights to fine dining experiences, we provide you with recommendations and options to explore the local gastronomy, adding a delicious dimension to your travels.</p>
              </Col>
            </Row>

            <Row className="mb-5 align-items-center">
              <Col md={6}>
                <img src={serviceImage} alt="Exceptional Service for Your Travels with TripTack Tix" className="img-fluid rounded shadow-sm" />
              </Col>
              <Col md={6}>
                <h2>Exceptional Service for Your Travels with TripTack Tix</h2>
                <p>At TripTack Tix, we are dedicated to providing you with exceptional service at every stage of your journey. Our team is committed to ensuring your travel experience is smooth, comfortable, and memorable. Whether you need assistance with bookings, itinerary adjustments, or local information, we're here to help with a friendly and professional approach.</p>
              </Col>
            </Row>

            <Row className="mb-5 align-items-center">
              <Col md={6} className="order-md-2">
                <img src={spa} alt="Relax and Rejuvenate on Your Getaway with TripTack Tix" className="img-fluid rounded shadow-sm" />
              </Col>
              <Col md={6} className="order-md-1">
                <h2>Relax and Rejuvenate on Your Getaway with TripTack Tix</h2>
                <p>Enhance your travel experience with opportunities for relaxation and rejuvenation. TripTack Tix can help you find serene spa retreats, wellness experiences, and tranquil escapes within your chosen destinations, allowing you to unwind and return feeling refreshed.</p>
              </Col>
            </Row>

            <Row className="align-items-center">
              <Col md={6}>
                <img src={policyImage} alt="TripTack Tix Travel Guidelines" className="img-fluid rounded shadow-sm" />
              </Col>
              <Col md={6}>
                <h2>TripTack Tix Travel Guidelines</h2>
                <p>To ensure a smooth and enjoyable experience for all our travelers, please be aware of our general travel guidelines:</p>
                <ul>
                  <li><strong>Booking Confirmation:</strong> Review your booking details carefully upon confirmation.</li>
                  <li><strong>Travel Documents:</strong> Ensure you have all necessary travel documents, including passports and visas.</li>
                  <li><strong>Check-in Procedures:</strong> Familiarize yourself with airline and accommodation check-in procedures.</li>
                  <li><strong>Baggage Policies:</strong> Adhere to the baggage allowances of your chosen airlines.</li>
                  <li><strong>Respect Local Customs:</strong> Be mindful and respectful of the local cultures and traditions in your destination.</li>
                  <li><strong>Safety and Security:</strong> Prioritize your safety and security during your travels.</li>
                </ul>
                <p>For specific policies related to your bookings, please refer to your confirmation details and the terms and conditions of the respective service providers.</p>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default AboutUsContent;