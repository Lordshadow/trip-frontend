import React from "react";
import "../styles/styles.css"; // Import styles

const HomePage = () => {
  return (
    <div className="home-container-no-bs">
      <div className="home-hero-no-bs">
        <div className="overlay">
          <div className="hero-content">
            <h1>Plan Your Perfect Getaway with TripTack Tix</h1>
            <p className="lead">
              Discover amazing destinations and create your ideal trip with
              TripTack Tix.
            </p>
            <a href="/destinations" className="btn-explore">
              Explore Destinations
            </a>
          </div>
        </div>
      </div>
      <div className="home-secondary-no-bs">
        <div className="secondary-content">
          <section id="destinations-preview" className="py-4">
            <h2 className="text-center mb-5">
              Find Your Next Adventure with TripTack Tix
            </h2>
            <p className="lead text-center mb-4">
              Browse our curated selection of destinations on TripTack Tix, from
              bustling cities to serene natural landscapes. Start planning your
              unforgettable journey today.
            </p>
            <div className="room-cards-container">
              <div className="room-card">
                <img
                  src="https://imgs.search.brave.com/ENrOC44wBZxhfLjtaZgUHyZZM-CApbjY8aqHIjIYGKA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c3RhdGUuZ292L3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE5LzA0/L0phcGFuLTIxMDd4/MTQwNi5qcGc"
                  alt="Tokyo Cityscape"
                  className="card-img-top"
                />
                <div className="card-body text-center">
                  <h3 className="card-title h5">Tokyo, Japan</h3>
                  <p className="card-text small">
                    Experience the vibrant culture, futuristic architecture,
                    and delicious cuisine of this incredible metropolis with
                    TripTack Tix.
                  </p>
                  <a
                    href="/destinations?location=tokyo"
                    className="btn-outline-primary"
                  >
                    Explore
                  </a>
                </div>
              </div>
              <div className="room-card">
                <img
                  src="https://imgs.search.brave.com/iqEKkIwFfOD6WQHFdFBY4zGyTZiwe_epuIcOZCffisI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvOTEx/NTcwOTA0L3Bob3Rv/L3ZpZXctb2YtdmVu/aWNlcy1ncmFuZC1j/YW5hbC5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9a2htWWIw/dkZKQ2Zfa1dHTzlF/R0V4cm5SWHFQSENE/MVBHSXdUbGRub3hG/UT0"
                  alt="Rome Colosseum"
                  className="card-img-top"
                />
                <div className="card-body text-center">
                  <h3 className="card-title h5">Rome, Italy</h3>
                  <p className="card-text small">
                    Discover ancient history, iconic landmarks, and charming
                    streets in the eternal city with TripTack Tix.
                  </p>
                  <a
                    href="/destinations?location=rome"
                    className="btn-outline-primary"
                  >
                    Explore
                  </a>
                </div>
              </div>
              <div className="room-card">
                <img
                  src="https://imgs.search.brave.com/bkMOYCacjh_jQhYcl8yV3lbbSfCdEkyS3RPWJBEPI6w/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzk0Lzg0LzQ1/LzM2MF9GXzk0ODQ0/NTI0X0ZGTWN0blla/azJTZktRTXFrWFdO/WmprY0NCbE9BUjZH/LmpwZw"
                  alt="Swiss Alps"
                  className="card-img-top"
                />
                <div className="card-body text-center">
                  <h3 className="card-title h5">Swiss Alps, Switzerland</h3>
                  <p className="card-text small">
                    Immerse yourself in breathtaking mountain scenery, enjoy
                    outdoor activities, and experience Swiss hospitality with
                    TripTack Tix.
                  </p>
                  <a
                    href="/destinations?location=swiss-alps"
                    className="btn-outline-primary"
                  >
                    Explore
                  </a>
                </div>
              </div>
            </div>
            <div className="text-center mt-4">
              <a href="/destinations" className="btn-primary">
                View All Destinations on TripTack Tix
              </a>
            </div>
          </section>

          <section id="plan-your-trip" className="py-4">
            <h2 className="text-center mb-5">
              Start Planning Your Trip with TripTack Tix
            </h2>
            <p className="lead text-center mb-4">
              Tell us your preferences and let TripTack Tix help you craft the
              perfect itinerary. Discover exciting activities and find the best
              accommodations for your adventure.
            </p>
            <div className="experience-items">
              <div className="experience-item">
                <i
                  className="bi bi-geo-alt me-3 text-info"
                  style={{ fontSize: "2rem" }}
                ></i>
                <div>
                  <h3 className="h5">Choose Your Destination</h3>
                  <p className="small text-white">
                    Select from a wide range of incredible locations around the
                    globe on TripTack Tix.
                  </p>
                </div>
              </div>
              <div className="experience-item">
                <i
                  className="bi bi-calendar-event me-3 text-warning"
                  style={{ fontSize: "2rem" }}
                ></i>
                <div>
                  <h3 className="h5">Select Your Dates</h3>
                  <p className="small text-white">
                    Pick the perfect time to travel and explore your chosen
                    destination with TripTack Tix.
                  </p>
                </div>
              </div>
              <div className="experience-item">
                <i
                  className="bi bi-briefcase me-3 text-success"
                  style={{ fontSize: "2rem" }}
                ></i>
                <div>
                  <h3 className="h5">Find Activities & Stays</h3>
                  <p className="small text-white">
                    Discover exciting things to do and comfortable places to
                    stay during your trip with TripTack Tix.
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center mt-4">
              <a href="/plan" className="btn-secondary">
                Start Planning Now with TripTack Tix
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HomePage;