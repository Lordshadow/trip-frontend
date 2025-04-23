import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/about.css";
import environmentImage from "../assets/environment.jpg";
import advantageImage from "../assets/advantage.jpg"; 
import foodImage from "../assets/food.jpg"; 
import serviceImage from "../assets/service.jpg"; 
import spa from "../assets/spa.jpg"
import policyImage from "../assets/policy.jpg"; 

const AboutUsContent = () => {
  return (
    <div className="about-us-page">
        <div className="tint">
        <div className="contentwrapper">
    <Container className="py-5">
      <Row className="mb-5 align-items-center">
        <Col md={6} className="order-md-2">
          <img src={environmentImage} alt="Our Enchanting Environment" className="img-fluid rounded shadow-sm" />
        </Col>
        <Col md={6} className="order-md-1">
          <h2>Our Enchanting Environment</h2>
          <p>Nestled in the heart of the shimmering Azure Atoll, Paradise Resort is a sanctuary where the turquoise embrace of the Indian Ocean meets the emerald canopy of tropical foliage. Our resort is fringed by pristine white-sand beaches that gently slope into vibrant coral gardens, teeming with a kaleidoscope of marine life. The air is alive with the soft rustling of palm leaves and the soothing melody of ocean waves, creating an atmosphere of unparalleled tranquility and natural beauty. We are privileged to be custodians of this exquisite environment and are deeply committed to its preservation for generations to come.</p>
        </Col>
      </Row>

      <Row className="mb-5 align-items-center">
        <Col md={6}>
          <img src={advantageImage} alt="The Paradise Resort Advantage" className="img-fluid rounded shadow-sm" />
        </Col>
        <Col md={6}>
          <h2>The Paradise Resort Advantage</h2>
          <p>Choosing Paradise Resort means immersing yourself in a world where every detail is crafted for your ultimate comfort and enjoyment. Here's what sets us apart:</p>
          <ul>
            <li><strong>Secluded Island Paradise:</strong> Our exclusive location on the Azure Atoll offers a sense of blissful isolation and direct access to pristine beaches and a vibrant lagoon.</li>
            <li><strong>Luxurious Villas and Bungalows:</strong> Indulge in our thoughtfully designed overwater bungalows and beachfront villas, each boasting breathtaking views and premium amenities.</li>
            <li><strong>Exquisite Island Cuisine:</strong> Delight your palate with the freshest seafood and tropical flavors at our signature restaurants and casual beachfront dining venues.</li>
            <li><strong>Impeccable and Attentive Service:</strong> Our warm and dedicated team is committed to anticipating your every need and ensuring a seamless and personalized stay.</li>
            <li><strong>Curated Island Experiences:</strong> From snorkeling and diving in our crystal-clear waters to sunset cruises and cultural immersions, we offer a range of enriching activities.</li>
            <li><strong>Dedicated to Sustainable Luxury:</strong> We are deeply committed to minimizing our environmental footprint through responsible practices and conservation initiatives.</li>
          </ul>
        </Col>
      </Row>

      <Row className="mb-5 align-items-center">
        <Col md={6} className="order-md-2">
          <img src={foodImage} alt="A Culinary Journey to Paradise" className="img-fluid rounded shadow-sm" />
        </Col>
        <Col md={6} className="order-md-1">
          <h2>A Culinary Journey to Paradise</h2>
          <p>At Paradise Resort, dining is an exploration of the senses, inspired by the bounty of the ocean and the richness of local ingredients. Our passionate chefs create culinary masterpieces that capture the essence of island life. Enjoy:</p>
          <ul>
            <li><strong>Ocean-Fresh Seafood Delights:</strong> Savor the taste of the Indian Ocean with our daily selection of freshly caught fish and shellfish, prepared with aromatic spices and innovative techniques.</li>
            <li><strong>The Flavors of the Tropics:</strong> Discover the sweetness of sun-ripened tropical fruits and the vibrancy of locally sourced vegetables in our creative dishes and refreshing beverages.</li>
            <li><strong>Panoramic Dining Venues:</strong> From the elegant Oceanview Restaurant with its stunning vistas to the relaxed Sands Grill by the beach, each setting offers a unique ambiance.</li>
            <li><strong>Personalized Culinary Experiences:</strong> Our chefs are delighted to accommodate dietary requirements and create bespoke menus for special occasions, ensuring a truly tailored dining experience.</li>
          </ul>
        </Col>
      </Row>

      <Row className="mb-5 align-items-center">
        <Col md={6}>
          <img src={serviceImage} alt="Our Commitment to Exceptional Service" className="img-fluid rounded shadow-sm" />
        </Col>
        <Col md={6}>
          <h2>Our Commitment to Exceptional Service</h2>
          <p>Our dedicated team at Paradise Resort is passionate about creating a truly exceptional and personalized experience for each and every guest. From the moment you arrive until your departure, you can expect attentive and genuine service. Our staff is trained to anticipate your needs and go the extra mile to ensure your comfort and satisfaction. Whether you require assistance with planning activities, arranging transportation, or simply seeking recommendations, our team is always on hand to assist with a warm smile and professional expertise.</p>
        </Col>
      </Row>

      <Row className="mb-5 align-items-center">
        <Col md={6} className="order-md-2">
          <img src={spa} alt="Rejuvenating Spa and Massage Services" className="img-fluid rounded shadow-sm" />
        </Col>
        <Col md={6} className="order-md-1">
          <h2>Rejuvenating Spa and Massage Services</h2> {/* Added Spa Section */}
          <p>Escape to a realm of tranquility at our dedicated spa sanctuary. Our skilled therapists offer a comprehensive menu of indulgent treatments and therapeutic massages designed to melt away stress and restore your inner balance. Using natural and locally sourced ingredients, our spa experiences are tailored to your individual needs, leaving you feeling refreshed, revitalized, and deeply relaxed. From soothing aromatherapy massages to invigorating body scrubs and rejuvenating facials, discover the perfect way to enhance your well-being during your stay at Paradise Resort.</p>
        </Col>
      </Row>

      <Row className="mb-5 align-items-center">
        <Col md={6} className="order-md-2">
          <img src={policyImage} alt="Resort Policies" className="img-fluid rounded shadow-sm" />
        </Col>
        <Col md={6} className="order-md-1">
          <h2>Resort Policies</h2>
          <p>To ensure a comfortable and enjoyable stay for all our guests, please take note of the following policies:</p>
          <ul>
            <li><strong>Check-in:</strong> 3:00 PM</li>
            <li><strong>Check-out:</strong> 11:00 AM</li>
            <li><strong>Payment:</strong> We accept major credit cards (Visa, Mastercard, American Express) and bank transfers. A deposit of 50% of the total booking value is required to secure your reservation.</li>
            <li><strong>Cancellation Policy:</strong> Cancellations made more than 30 days prior to arrival will receive a full refund, less a [Specify Percentage or Fixed Amount] processing fee. Cancellations made between 15 and 30 days prior to arrival will incur a charge of 50% of the total booking value. Cancellations made within 14 days of arrival or no-shows will be charged the full booking value.</li>
            <li><strong>Environmental Responsibility:</strong> We are committed to preserving our pristine environment. We kindly request guests to conserve water and electricity, utilize provided recycling facilities, and refrain from disturbing the natural flora and fauna.</li>
            <li><strong>Couples Focus:</strong> At Paradise Resort, our pricing structure is designed to accommodate a diverse range of travelers, including individuals, friends groups, and families, alongside couples seeking a romantic getaway. Due to the higher demand and the enhanced value often associated with couple-centric stays and the utilization of double-occupancy accommodations, bookings confirmed for two adults identifying as a couple are subject to a supplemental tariff of 45% on the base room rate. This adjustment allows us to maintain competitive pricing and offer tailored experiences for all our valued guests. Please contact our reservations team for detailed pricing information relevant to your specific travel arrangements.</li>
            <li><strong>Smoking Policy:</strong> For the comfort and health of all our guests, smoking is permitted only in designated outdoor areas. Smoking is strictly prohibited inside all villas, bungalows, restaurants, and enclosed spaces.</li>
            <li><strong>Children Policy:</strong> Paradise Resort primarily caters to adults. Guests under the age of 16 are welcome in select villa categories when accompanied by a responsible adult. Please inquire with our reservations team for suitable accommodation options and any relevant policies.</li>
          </ul>
          <p>For any further inquiries or clarifications regarding our policies, please do not hesitate to contact our dedicated reservations team who will be happy to assist you.</p>
        </Col>
      </Row>
    </Container>
    </div>
    </div>
    </div>
  );
};

export default AboutUsContent;