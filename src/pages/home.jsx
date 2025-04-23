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
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Shinjuku_2019_view.jpg/1280px-Shinjuku_2019_view.jpg"
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
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Colosseum_in_Rome%2C_Italy_-_April_2007.jpg/1280px-Colosseum_in_Rome%2C_Italy_-_April_2007.jpg"
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
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Matterhorn_from_Stellisee.jpg/1280px-Matterhorn_from_Stellisee.jpg"
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