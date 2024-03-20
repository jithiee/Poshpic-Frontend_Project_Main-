import React, { useState } from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField } from '@mui/material';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [show, setShow] = useState(false);

  const validateEmail = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !regex.test(email)) {
      setEmailError('Enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = () => {
    if (!password || password.length < 3) {
      setPasswordError('Password must be at least 6 characters long');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (validateEmail() && validatePassword()) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/login/', {
          email: email,
          password: password,
        });

        const { token, isPhotographer } = response.data;
        saveToken(token.access);
        
        if (isPhotographer) {
          // Redirect to photographer profile page
          navigate('/photopgrapheruserprofile');
          window.location.reload()
        } else {
            
          navigate('/home');
        }

      } catch (error) {
        console.error('Login failed. Invalid email or password.', error);
        
      }
    }
  };

  const saveToken = (token) => {
    localStorage.setItem('authtoken', token);
    // console.log('authToken:', token);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="reset-password-container" style={{ backgroundImage: 'url(your-image-url)', backgroundSize: 'cover' }}>
        <div className="reset-password-form">
          <h2 className="reset-password-heading" style={{ color: 'black', fontFamily: 'monospace', fontWeight: 'bold' }}>LOGIN</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email" className="form-label ">
                Email
              </label>
              <TextField
                fullWidth
                label="Enter your email"
                variant="outlined"
                margin="normal"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="error-message " style={{ color: 'red' }}>{emailError}</p>
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <TextField
                fullWidth
                label="Enter your password"
                variant="outlined"
                margin="normal"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="error-message" style={{ color: 'red' }}>{passwordError}</p>
            </div>
            <div>
              <p className='forgotpassword' onClick={handleShow}> Forgot password . . . ?</p>
            </div>
            <MDBBtn type="submit" color="primary ps-5 pe-5">
              Login
            </MDBBtn>
          </form>
          <div className="footer-link padding-top--24">
            <span>Don't have an account?  <p onClick={()=>navigate('/')}  style={{color:'blue',cursor:'pointer'}} > Sign up</p>  </span>
            <div className="listing padding-top--24 padding-bottom--24 flex-flex center-center">
              <span><a href="#">©Poshpic</a></span>
              <span><a href="#">Privacy & terms</a></span>
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "blue" }}>Forgot password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type='submit' variant="primary" onClick={() => navigate('/resetpassword')}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Login;
