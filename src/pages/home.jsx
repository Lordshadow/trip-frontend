import React from "react";
import "../styles/styles.css"; // Import styles

const HomePage = () => {
  return (
    <div className="home-container-no-bs">
      <div className="home-hero-no-bs">
        <div className="overlay">
          <div className="hero-content">
            <h1>Welcome to Paradise</h1>
            <p className="lead">
              Experience world-class luxury and stunning beachside views.
            </p>
            <a href="/rooms" className="btn-explore">
              Explore Rooms
            </a>
          </div>
        </div>
      </div>
      <div className="home-secondary-no-bs">
        <div className="secondary-content">
          <section id="rooms-preview" className="py-4">
            <h2 className="text-center mb-5">Discover Your Perfect Escape</h2>
            <p className="lead text-center mb-4">
              Our rooms and suites are designed to provide the ultimate in
              comfort and style. Each offers a unique ambiance and stunning
              views, ensuring a truly unforgettable stay.
            </p>
            <div className="room-cards-container">
              <div className="room-card">
                <img
                  src="https://cms-asset.ayana.com/cdn-cgi/image/f=auto,q=85,width=1150/575x320_KMD_Room_OVS_Highlight1_b9a7742dfe.jpg"
                  alt="Ocean View Suite"
                  className="card-img-top"
                />
                <div className="card-body text-center">
                  <h3 className="card-title h5">Ocean View Suites</h3>
                  <p className="card-text small">
                    Spacious suites with breathtaking ocean views and private
                    balconies.
                  </p>
                  <a
                    href="/rooms?type=ocean-view"
                    className="btn-outline-primary"
                  >
                    Explore
                  </a>
                </div>
              </div>
              <div className="room-card">
                <img
                  src="https://www.theluxurysignature.com/wp-content/uploads/2015/02/villa-anavaya-samui-seaview.jpg"
                  alt="Beachfront Villa"
                  className="card-img-top"
                />
                <div className="card-body text-center">
                  <h3 className="card-title h5">Beachfront Villas</h3>
                  <p className="card-text small">
                    Luxurious villas with direct beach access and private plunge
                    pools.
                  </p>
                  <a
                    href="/rooms?type=beachfront-villa"
                    className="btn-outline-primary"
                  >
                    Explore
                  </a>
                </div>
              </div>
              <div className="room-card">
                <img
                  src="https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBukBbX.img?w=1920&h=1080&m=4&q=74"
                  alt="Overwater Bungalow"
                  className="card-img-top"
                />
                <div className="card-body text-center">
                  <h3 className="card-title h5">Overwater Bungalows</h3>
                  <p className="card-text small">
                    Secluded bungalows suspended over the crystal-clear lagoon.
                  </p>
                  <a
                    href="/rooms?type=overwater-bungalow"
                    className="btn-outline-primary"
                  >
                    Explore
                  </a>
                </div>
              </div>
            </div>
            <div className="text-center mt-4">
              <a href="/rooms" className="btn-primary">
                View All Accommodations
              </a>
            </div>
          </section>

          <section id="experiences" className="py-4">
            <h2 className="text-center mb-5">Unforgettable Experiences</h2>
            <p className="lead text-center mb-4">
              At Paradise, we offer a curated selection of experiences
              designed to immerse you in the beauty and culture of our
              destination.
            </p>
            <div className="experience-items">
              <div className="experience-item">
                <i
                  className="bi bi-water me-3 text-info"
                  style={{ fontSize: "2rem" }}
                ></i>
                <div>
                  <h3 className="h5">Aquatic Adventures</h3>
                  <p className="small text-white">
                    Explore vibrant coral reefs with snorkeling or diving, embark
                    on a sunset cruise, or enjoy the thrill of jet skiing.
                  </p>
                </div>
              </div>
              <div className="experience-item">
                <i
                  className="bi bi-spa me-3 text-warning"
                  style={{ fontSize: "2rem" }}
                ></i>
                <div>
                  <h3 className="h5">Wellness & Rejuvenation</h3>
                  <p className="small text-white">
                    Indulge in a pampering spa treatment, practice yoga on the
                    beach, or simply relax by our infinity pool.
                  </p>
                </div>
              </div>
              <div className="experience-item">
                <i
                  className="bi bi-compass me-3 text-success"
                  style={{ fontSize: "2rem" }}
                ></i>
                <div>
                  <h3 className="h5">Cultural Immersion</h3>
                  <p className="small text-white">
                    Discover the rich local culture with guided tours, traditional
                    performances, and culinary experiences.
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center mt-4">
              <a href="/activities" className="btn-secondary">
                Explore All Activities
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HomePage;