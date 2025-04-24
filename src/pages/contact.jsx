import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/contact.css"; // Import the new CSS // Keep your existing styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faEnvelope, faPhone, faClock } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [submissionError, setSubmissionError] = useState("");

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
      setIsSubmitting(true);
      setSubmissionMessage("");
      setSubmissionError("");
      try {
        const res = await fetch('https://trip-planner-backend-isxb.onrender.com/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message }),
        });

        const data = await res.json();
        setIsSubmitting(false);

        if (res.ok) {
          setSubmissionMessage("Message sent successfully!");
          setName("");
          setEmail("");
          setMessage("");
        } else {
          setSubmissionError(data.message || "Something went wrong. Try again later.");
        }
      } catch (err) {
        console.error(err);
        setIsSubmitting(false);
        setSubmissionError("Failed to send message. Please try again.");
      }
    }
  };

  return (
    <div className="contact-page">
      <div className="parallax">
        <div className="fade-in hero-content-contact">
          <h1>Contact Us</h1>
          <p className="lead">We'd love to hear from you! Get in touch with any questions or inquiries.</p>
        </div>
      </div>

      <Container className="contact-section py-5">
        <Row className="gx-lg-5">
          <Col lg={6} className="contact-info-col mb-4 mb-lg-0">
            <div className="contact-info-card">
              <h2>Contact Information</h2>
              <p className="mb-4">Our friendly team is ready to assist you. Feel free to reach out to us using the details below or send us a message directly.</p>
              <ul className="contact-details">
                <li>
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
                  <span>123 Paradise Island Road, Azure Atoll, Paradise</span>
                </li>
                <li>
                  <FontAwesomeIcon icon={faEnvelope} className="icon" />
                  <span>zenturyaegis@hotmail.com</span>
                </li>
                <li>
                  <FontAwesomeIcon icon={faPhone} className="icon" />
                  <span>+91 9894412777</span>
                </li>
                <li>
                  <FontAwesomeIcon icon={faClock} className="icon" />
                  <span>Monday - Sunday: 9:00 AM - 6:00 PM (Local Time)</span>
                </li>
              </ul>
            </div>
          </Col>
          <Col lg={6} className="contact-form-col">
            <div className="contact-form-card">
              <h2>Send Us a Message</h2>
              <p className="mb-3">We aim to respond to all inquiries within 24 hours. Please fill out the form below.</p>
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
                {submissionMessage && <div className="alert alert-success">{submissionMessage}</div>}
                {submissionError && <div className="alert alert-danger">{submissionError}</div>}
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;