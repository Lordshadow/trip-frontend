import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { auth } from './firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import '../styles/auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [firebaseError, setFirebaseError] = useState('');
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const validateForm = () => {
    let isValid = true;
    setEmailError('');

    if (!email.trim()) {
      setEmailError('Please enter your email address.');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    }

    return isValid;
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setFirebaseError('');
      setResetEmailSent(false);
      try {
        await sendPasswordResetEmail(auth, email);
        console.log('Password reset email sent to:', email);
        setResetEmailSent(true);
        alert('Password reset email has been sent to your email address. Please check your inbox.');
      } catch (error) {
        console.error('Error sending password reset email:', error);
        setFirebaseError(error.message);
        if (error.code === 'auth/user-not-found') {
          setEmailError('There is no user record corresponding to this email address.');
        } else {
          setFirebaseError('An error occurred while sending the reset email.');
        }
      }
    }
  };

  return (
    <div className="auth-page">
      <Container>
        <Row className="justify-content-center mt-5">
          <Col md={6}>
            <div className="auth-form">
              <h2 className="text-center mb-4">Forgot Password</h2>
              {firebaseError && <Alert variant="danger" className="text-center">{firebaseError}</Alert>}
              {resetEmailSent && (
                <Alert variant="success" className="text-center">
                  Password reset email has been sent! Please check your inbox.
                </Alert>
              )}
              <Form onSubmit={handleResetPassword}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your registered email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={emailError ? 'is-invalid' : ''}
                  />
                  <Form.Control.Feedback type="invalid">
                    {emailError}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Reset Password
                </Button>
              </Form>
              <p className="mt-3 text-center">
                Remember your password? <Link to="/signin">Sign In</Link>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ForgotPassword;