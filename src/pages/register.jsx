import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../components/firebase';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  reload,
} from 'firebase/auth';
import '../styles/auth.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [firebaseError, setFirebaseError] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    setNameError('');
    setEmailError('');
    setPhoneNumberError('');
    setPasswordError('');
    setConfirmPasswordError('');

    if (!name.trim()) {
      setNameError('Please enter your name.');
      isValid = false;
    }

    if (!email.trim()) {
      setEmailError('Please enter your email address.');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    }

    if (!phoneNumber.trim()) {
      setPhoneNumberError('Please enter your phone number.');
      isValid = false;
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      setPhoneNumberError('Please enter a valid 10-digit phone number.');
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError('Please enter a password.');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      isValid = false;
    }

    if (!confirmPassword.trim()) {
      setConfirmPasswordError('Please confirm your password.');
      isValid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match.');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setFirebaseError('');
      setVerificationSent(false);
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await updateProfile(user, {
          displayName: name,
          phoneNumber: phoneNumber,
        });

        await sendEmailVerification(auth.currentUser);
        setVerificationSent(true);

        const userData = {
          name: name,
          email: email,
          firebaseUID: user.uid,
          phoneNumber: phoneNumber,
        };

        fetch('https://trip-planner-backend-isxb.onrender.com/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('User data sent to backend:', data);
            if (data.error) {
              setFirebaseError(data.error); // Display error from backend
            }
          })
          .catch((error) => {
            console.error('Error sending data to backend:', error);
            setFirebaseError('Error connecting to backend'); 
          });
      } catch (error) {
        console.error('Firebase registration error:', error);
        if (error.code === 'auth/email-already-in-use') {
          setEmailError('This email address is already in use.');
        } else if (error.code === 'auth/weak-password') {
          setPasswordError('Password should be at least 6 characters.');
        } else {
          setFirebaseError('An error occurred during registration.');
        }
      }
    }
  };

  // Handle Verification Check
  const handleCheckVerification = async () => {
    try {
      await reload(auth.currentUser);
      if (auth.currentUser.emailVerified) {
        alert('Email verified successfully! You can now log in.');
        navigate('/login');
      } else {
        alert('Email not verified yet. Please check your inbox and click the verification link.');
      }
    } catch (error) {
      console.error('Error checking verification:', error);
      alert('An error occurred while checking email verification.');
    }
  };

  return (
    <div className="auth-page">
      <Container>
        <Row className="justify-content-center mt-5">
          <Col md={6}>
            <div className="auth-form">
              <h2 className="text-center mb-4">Register</h2>
              {firebaseError && <Alert variant="danger" className="text-center">{firebaseError}</Alert>}
              {verificationSent && (
                <Alert variant="info" className="text-center">
                  Verification email sent! Please check your inbox to verify your account.
                </Alert>
              )}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={nameError ? 'is-invalid' : ''}
                  />
                  <Form.Control.Feedback type="invalid">{nameError}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={emailError ? 'is-invalid' : ''}
                  />
                  <Form.Control.Feedback type="invalid">{emailError}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter your 10-digit phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className={phoneNumberError ? 'is-invalid' : ''}
                  />
                  <Form.Control.Feedback type="invalid">{phoneNumberError}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={passwordError ? 'is-invalid' : ''}
                  />
                  <Form.Control.Feedback type="invalid">{passwordError}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={confirmPasswordError ? 'is-invalid' : ''}
                  />
                  <Form.Control.Feedback type="invalid">{confirmPasswordError}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3 d-flex align-items-center gap-2">
                  <Form.Check
                    type="checkbox"
                    label="Show Password"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Register
                </Button>
              </Form>

              
              {verificationSent && (
                <div className="text-center mt-3">
                  <Button variant="success" onClick={handleCheckVerification}>
                    I've Verified My Email
                  </Button>
                </div>
              )}

              <p className="mt-3 text-center">
                Already have an account? <Link to="/login">Sign In</Link>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
