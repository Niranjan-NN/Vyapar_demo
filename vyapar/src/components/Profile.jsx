import React from 'react';
import { FaSearch, FaShoppingCart, FaBell, FaUserCircle,FaHome } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';

const Profile = () => {
    const navigate = useNavigate();

    const user = {
        name: "John Doe",
        gender: "Male",
        email: "john.doe@example.com",
        phone: "+1234567890",
        address: "14/F apartment, street name, City, Country",
        dob: "07 July 1993",
        countryRegion: "USA, New York",
        language: "English (US) - English"
    };

    return (
        <div className="profile-body">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">Vyapar</div>
        <div className="navbar-search">
            <input type="text" placeholder="Search for grocery, vegetables, spices..." className="search-input" />
            <FaSearch className="search-icon" />
        </div>
        <div className="navbar-icons">
          <FaHome onClick={() => navigate("/home")} />
          <FaShoppingCart onClick={() => navigate("/cart")} />
          <FaBell />
          <FaUserCircle onClick={() => navigate("/profile")} />
        </div>
      </nav>
            <div className="profile-container">
                <div className="profile-sidebar">
                    <ul>
                        <li><a className="active" href="#">Personal information</a></li>
                        <li><a href="#">Billing & Payments</a></li>
                        <li><a href="#">Order History</a></li>
                        <li><a href="#">Gift Cards</a></li>
                    </ul>
                </div>
                <div className="profile-main-content">
                    <button className="profile-back-button" onClick={() => navigate('/Home')}>
                        Back
                    </button>
                    <div className="profile-picture">
                        <FaUserCircle size={150} />
                    </div>
                    <h1>Personal information</h1>
                    <p>Manage your personal information, including phone numbers and email address where you can be contacted</p>
                    <div className="info-box">
                        <div className="icon">👤</div>
                        <div className="details">
                            <h2>Name</h2>
                            <p>{user.name}</p>
                        </div>
                    </div>
                    <div className="info-box">
                        <div className="icon">🎂</div>
                        <div className="details">
                            <h2>Date of Birth</h2>
                            <p>{user.dob}</p>
                        </div>
                    </div>
                    <div className="info-box">
                        <div className="icon">🌐</div>
                        <div className="details">
                            <h2>Country Region</h2>
                            <p>{user.countryRegion}</p>
                        </div>
                    </div>
                    <div className="info-box">
                        <div className="icon">🇬🇧</div>
                        <div className="details">
                            <h2>Language</h2>
                            <p>{user.language}</p>
                        </div>
                    </div>
                    <div className="info-box">
                        <div className="icon">📧</div>
                        <div className="details">
                            <h2>Contactable at</h2>
                            <textarea defaultValue={user.email} rows="2" cols="30"></textarea>
                        </div>
                    </div>
                    <div className="info-box">
                        <div className="icon">📞</div>
                        <div className="details">
                            <h2>Phone</h2>
                            <p>{user.phone}</p>
                        </div>
                    </div>
                    <div className="info-box">
                        <div className="icon">🏠</div>
                        <div className="details">
                            <h2>Address</h2>
                            <p>{user.address}</p>
                        </div>
                    </div>
                </div>
                <button className="profile-sign-out">Sign out</button>
            </div>
        </div>
    );
};

export default Profile;
