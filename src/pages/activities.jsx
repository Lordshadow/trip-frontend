import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../styles/activities.css";
import snorkelingImage from "../assets/snorkeling.jpg";
import divingImage from "../assets/divingImage.jpg";
import sunsetCruiseImage from "../assets/sunsetcruiseImage.jpg";
import spaTreatmentImage from "../assets/spa.jpg";
import culturalTourImage from "../assets/culturaltourImage.jpg";
import kayakingImage from "../assets/kayakingImage.jpg";

const Activities = () => {
  const activities = [
    {
      title: "Snorkeling Adventures",
      description: "Explore the vibrant coral reefs and encounter a kaleidoscope of marine life just steps from our beaches. Guided tours and equipment rental available.",
      image: snorkelingImage,
    },
    {
      title: "World-Class Scuba Diving",
      description: "Discover the underwater wonders of the Azure Atoll with our PADI-certified dive center. Perfect for beginners and experienced divers alike.",
      image: divingImage,
    },
    {
      title: "Romantic Sunset Cruises",
      description: "Sail into the breathtaking sunset aboard our luxury catamaran. Enjoy stunning views, refreshing drinks, and unforgettable moments.",
      image: sunsetCruiseImage,
    },
    {
      title: "Rejuvenating Spa Treatments",
      description: "Indulge in a range of soothing massages, body wraps, and facials at our tranquil spa sanctuary. Restore your body and mind.",
      image: spaTreatmentImage,
    },
    {
      title: "Immersive Cultural Tours",
      description: "Experience the local culture with guided tours to nearby villages, showcasing traditions, crafts, and the warm hospitality of the islanders.",
      image: culturalTourImage,
    },
    {
      title: "Kayaking and Paddleboarding",
      description: "Glide through the calm lagoon waters at your own pace. Kayaks and paddleboards are available for rent.",
      image: kayakingImage,
    },
  ];

  return (
    <div className="activities-page">
      <div className="activities-hero">
        <div className="hero-overlay">
          <Container className="hero-content">
            <h1>Resort Activities</h1>
            <p className="lead">Embark on unforgettable adventures and create lasting memories at Paradise Resort.</p>
          </Container>
        </div>
      </div>

      <Container className="py-5">
        <Row xs={1} md={2} lg={3} className="g-4">
          {activities.map((activity, index) => (
            <Col key={index}>
              <Card className="activity-card shadow-sm h-100">
                <div className="activity-image-container">
                  <Card.Img variant="top" src={activity.image} alt={activity.title} className="activity-image" />
                </div>
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{activity.title}</Card.Title>
                  <Card.Text className="mb-auto">{activity.description}</Card.Text>
                  {/* You could add a "Learn More" button here */}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Activities;