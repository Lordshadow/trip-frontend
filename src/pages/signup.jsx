import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../components/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import '../styles/auth.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [firebaseError, setFirebaseError] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    if (!email.trim()) {
      setEmailError('Please enter your email address.');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError('Please enter your password.');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setFirebaseError('');
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('Login successful:', user);

        if (user.emailVerified) {
          alert('Login Successful!');
          navigate('/profilepage'); // Assuming '/home' is your home page route
        } else {
          alert('Your email address has not been verified. Please check your inbox to verify.');
          // Optionally, you might want to sign the user out here:
          // await signOut(auth);
        }
      } catch (error) {
        console.error('Firebase sign-in error:', error);
        setFirebaseError(error.message);
        if (error.code === 'auth/user-not-found') {
          setEmailError('User not found. Please check your email or register.');
        } else if (error.code === 'auth/wrong-password') {
          setPasswordError('Incorrect password.');
        } else if (error.code === 'auth/too-many-requests') {
          setFirebaseError('Access to this account has been temporarily disabled due to many failed login attempts. You can try again later or reset your password.');
        } else {
          setFirebaseError('An error occurred during login.');
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
              <h2 className="text-center mb-4">Sign In</h2>
              {firebaseError && <Alert variant="danger" className="text-center">{firebaseError}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={emailError ? 'is-invalid' : ''}
                  />
                  <Form.Control.Feedback type="invalid">
                    {emailError}
                  </Form.Control.Feedback>
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
                  <Form.Control.Feedback type="invalid">
                    {passwordError}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3 d-flex justify-content-between align-items-center">
                  <Form.Check
                    type="checkbox"
                    label="Show Password"
                    onChange={() => setShowPassword(!showPassword)}
                    checked={showPassword}
                  />
                  <Link to="/forgot-password" className="forgot-password">
                    Forgot Password?
                  </Link>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check type="checkbox" label="Remember Me" />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Sign In
                </Button>
              </Form>
              <p className="mt-3 text-center">
                Not registered? <Link to="/register">Create an account</Link>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignIn;