import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/contact.css";
import "../styles/styles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faEnvelope, faPhone, faClock } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");

  const validateForm = () => {
    let isValid = true;
    setNameError("");
    setEmailError("");
    setMessageError("");

    if (!name.trim()) {
      setNameError("Please enter your name.");
      isValid = false;
    }

    if (!email.trim()) {
      setEmailError("Please enter your email.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }

    if (!message.trim()) {
      setMessageError("Please enter your message.");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const res = await fetch('https://trip-planner-backend-isxb.onrender.com/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message }),
        });
  
        const data = await res.json();
  
        if (res.ok) {
          alert("Message sent successfully!");
          setName("");
          setEmail("");
          setMessage("");
        } else {
          alert(data.message || "Something went wrong. Try again later.");
        }
      } catch (err) {
        console.error(err);
        alert("Failed to send message. Please try again.");
      }
    }
  };
  
  return (
    <div className="contact-page">
      <div className="parallax" style={{ backgroundImage: "url('../assets/formbg.jpg')" }}>
        <div className="fade-in">
          <Container className="hero-content">
            <h1>Contact Us</h1>
            <p className="lead">We'd love to hear from you! Get in touch with any questions or inquiries.</p>
          </Container>
        </div>
      </div>

      <Container className="py-5">
        <Row>
          <Col md={6}>
            <h2>Get in Touch</h2>
            <p>Our friendly team is ready to assist you.</p>
            <ul className="contact-info">
              <li>
                <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" /> 123 Paradise Island Road, Azure Atoll, Paradise
              </li>
              <li>
                <FontAwesomeIcon icon={faEnvelope} className="me-2" /> zenturyaegis@hotmail.com
              </li>
              <li>
                <FontAwesomeIcon icon={faPhone} className="me-2" /> +91 9894412777
              </li>
              <li>
                <FontAwesomeIcon icon={faClock} className="me-2" /> Monday - Sunday: 9:00 AM - 6:00 PM (Local Time)
              </li>
            </ul>
          </Col>
          <Col md={6}>
            <h2>Send Us a Message</h2>
            <p>We aim to respond to all inquiries within 24 hours.</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Your Name</label>
                <input
                  type="text"
                  className={`form-control ${nameError ? 'is-invalid' : ''}`}
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {nameError && <div className="invalid-feedback">{nameError}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Your Email</label>
                <input
                  type="email"
                  className={`form-control ${emailError ? 'is-invalid' : ''}`}
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && <div className="invalid-feedback">{emailError}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  className={`form-control ${messageError ? 'is-invalid' : ''}`}
                  id="message"
                  rows="4"
                  placeholder="Enter your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                {messageError && <div className="invalid-feedback">{messageError}</div>}
              </div>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;