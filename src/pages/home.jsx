import React from "react";
import "../styles/styles.css"; // Import styles


  const HomePage = () => {
    return (
      <div className="homepage">
        <main className="home-content">
          <p><strong>Welcome to TripTactix!</strong><br />
            Your gateway to unforgettable adventures. 🌍✨
          </p>
  
          <p><strong>Discover, Plan, Explore</strong><br />
            Whether you're craving tranquil beaches, bustling cities, or thrilling adventures,
            TripTactix is here to make your travel dreams come true.
          </p>
  
          <p><strong>Why Choose Us?</strong><br />
            - Expert Planning: Let us simplify your journey with personalized itineraries tailored to your interests.<br />
            - Hidden Gems: Explore offbeat destinations and discover authentic local experiences.<br />
            - Seamless Experience: From bookings to recommendations, we've got you covered.
          </p>
  
          <p><strong>Make Memories That Last</strong><br />
            Your next adventure is just a click away. Dive into the possibilities with TripTactix—where every journey tells a story.
          </p>
  
          <p><strong>Ready to start?</strong></p>
  
          <a href="/Catelog.html">
            <img src="/image-removebg-preview.png" alt="Explore Catalog" />
          </a>
          <br />
          <a href="/TTS.html">
            <button>Here you go! 🚌</button>
          </a>
        </main>
      </div>
    );
  };

export default HomePage;