import React, { useState, useEffect } from 'react';
import '../styles/ProfilePage.css';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import Orders from './Orders';
import Booking from './booking'; // Assuming a component for bookings is created

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.endsWith('/my-orders')) {
      setActiveTab('orders');
    } else if (location.pathname.endsWith('/book')) {
      setActiveTab('book');
    } else {
      setActiveTab('profile');
    }
  }, [location.pathname]);

  useEffect(() => {
    const fetchUserProfile = async (firebaseId) => {
      try {
        const response = await fetch(`https://trip-planner-backend-isxb.onrender.com/api/profile/${firebaseId}`);

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
        const uid = firebaseUser.uid;
        fetchUserProfile(uid);
      } else {
        setError('User not authenticated.');
        setLoading(false);
      }
    });
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'orders') navigate('/profile/my-orders');
    else if (tab === 'book') navigate('/profile/book');
    else navigate('/profile');
  };

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.error('Sign-out error:', error);
      });
  };

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
    <div className="profile-wrapper">
      <aside className="profile-sidebar">
        <img
          src={userProfile.photoURL || 'https://via.placeholder.com/150'}
          alt="User Avatar"
          className="profile-avatar"
        />
        <h2 className="profile-name">{userProfile.name || 'Unnamed User'}</h2>
        <p className="profile-join">Member since {userProfile.createdAt ? new Date(userProfile.createdAt).toLocaleDateString() : 'N/A'}</p>
        <div className="profile-meta">
          <p><strong>Email:</strong><br />{userProfile.email}</p>
          {userProfile.phoneNumber && <p><strong>Phone:</strong><br />{userProfile.phoneNumber}</p>}
          <p><strong>Total Bookings:</strong><br />{userProfile.totalBookings || 0}</p>
        </div>
        <nav className="profile-menu">
          <button className={`profile-tab ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => handleTabChange('profile')}>Profile Information</button>
          <button className={`profile-tab ${activeTab === 'book' ? 'active' : ''}`} onClick={() => handleTabChange('book')}>My Bookings</button>
          <button className={`profile-tab ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => handleTabChange('orders')}>My Orders</button>
          <button className="profile-tab signout" onClick={handleSignOut}>Sign Out</button>
        </nav>
      </aside>

      <main className="profile-main">
        {activeTab === 'profile' && (
          <>
            <h2>Profile Information</h2>
            <div className="profile-detail-grid">
              <div className="profile-field">
                <label>Full Name</label>
                <input type="text" value={userProfile.name || ''} readOnly />
              </div>
              <div className="profile-field">
                <label>Email</label>
                <input type="email" value={userProfile.email || ''} readOnly />
              </div>
              <div className="profile-field">
                <label>Phone</label>
                <input type="text" value={userProfile.phoneNumber || ''} readOnly />
              </div>
            </div>
          </>
        )}
        {activeTab === 'orders' && <Orders />}
        {activeTab === 'book' && <Booking />}
      </main>
    </div>
  );
};

export default ProfilePage;
