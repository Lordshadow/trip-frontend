import React, { useState, useEffect } from 'react';
import '../styles/ProfilePage.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Import Firebase Auth

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async (firebaseId) => {
      try {
        const response = await fetch(`https://trip-planner-backend-isxb.onrender.com/api/profile/${firebaseId}`, { // API endpoint to fetch by Firebase UID
          headers: {
            // Removed the 'Authorization' header
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          setError(`Failed to fetch profile: ${errorData.message || response.statusText}`);
          setLoading(false);
          return;
        }

        const userData = await response.json();
        setUserProfile(userData);
        setLoading(false);
      } catch (err) {
        setError(`An unexpected error occurred: ${err.message}`);
        setLoading(false);
      }
    };

    const auth = getAuth();
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in, get their Firebase UID
        const uid = firebaseUser.uid;
        fetchUserProfile(uid);
      } else {
        // User is signed out
        setError('User not authenticated.');
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return <div className="profile-container">Loading profile...</div>;
  }

  if (error) {
    return <div className="profile-container error">Error: {error}</div>;
  }

  if (!userProfile) {
    return <div className="profile-container">No user data found.</div>;
  }

  return (
    <div className="profile-container">
      <header className="profile-header">
        <h1>Your Profile</h1>
      </header>

      <section className="profile-info">
        <div className="info-item">
          <span className="info-label">Name:</span>
          <span className="info-value">{userProfile.name || 'N/A'}</span> 
        </div>
        <div className="info-item">
          <span className="info-label">Email:</span>
          <span className="info-value">{userProfile.email}</span>
        </div>
        {userProfile.phoneNumber && (
          <div className="info-item">
            <span className="info-label">Phone Number:</span>
            <span className="info-value">{userProfile.phoneNumber}</span>
          </div>
        )}
        
      </section>

    </div>
  );
};

export default ProfilePage;