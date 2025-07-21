import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Register.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const [registrationResult, setRegistrationResult] = useState(null);
  const [isPhotographer, setIsPhotographer] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const username = inputRef.current.username.value;
      const email = inputRef.current.email.value;
      const password = inputRef.current.password.value;
      const confirmPassword = inputRef.current.confirmPassword.value;
      const phone = inputRef.current.phone.value;
      const isPhotographer = inputRef.current.isPhotographer.checked;

      const items = {
        username: username,
        email: email,
        password: password,
        confirm_password: confirmPassword,
        phone: phone,
        is_photographer: isPhotographer,
      };
     
      const response = await axios.post('http://127.0.0.1:8000/register/', items, {
        headers: {
          'Content-Type': 'application/json',
        },
      });




      setRegistrationResult({
        status: response.status,
        message: 'Registration Successfull',
      });

      setTimeout(() => {
        navigate(`/otpregister/${email}`);
      }, 500);
    } catch (error) {
      console.error(error)
      handleRegistrationError(error);
    }
  };


  const handleRegistrationError = (error) => {
    if (error.response && error.response.status === 400) {
      const errorData = error.response.data;

      setRegistrationResult({
        status: 'error',
        message: 'Error during registration. Please try again.',
      });

    }

  };

  return (
    <div className='mainregform'  >
      <div className="reging container d-f">
        <div className="main">
          <p className="ms-5" style={{ color: 'white', fontFamily: 'initial', fontSize: '200%' }}>
            Poshpic
          </p>

          <div className="row">
            <div className="col-md-6 ">
              <img
                className="regimg"
                // src="https://img.freepik.com/free-vector/empty-wall-frame-decoration-background_1017-17386.jpg?w=740&t=st=1704275335~exp=1704275935~hmac=5e6a33d6f2687b53cbd4be36b4d3390c5b8d181f64c2f2c20abc81a8f2fe3d33"
                src='https://images.unsplash.com/photo-1499417267106-45cebb7187c9?q=80&w=1919&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                alt=""
              />
            </div>
            <div className="col-md-5 p-5">
              <form ref={inputRef} onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label" style={{ color: 'white' }}>
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter your username"
                    name="username"

                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label" style={{ color: 'white' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    name="email"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label" style={{ color: 'white' }}>
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    name="password"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label" style={{ color: 'white' }}>
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    name="confirmPassword"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label" style={{ color: 'white' }}>
                    Phone
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="phone"
                    placeholder="Enter your phone number"
                    name="phone"
                  />
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="isPhotographer"
                    name="isPhotographer"
                    checked={isPhotographer}
                    onChange={() => setIsPhotographer(!isPhotographer)}



                  />
                  <label className="form-check-label" htmlFor="isPhotographer">
                    I am a Photographer
                  </label>
                </div>
                <button
                  type="submit"
                  className="btn ps-5 pe-5"
                  style={{ backgroundColor: '#8F84FE', fontWeight: 'bold' }}
                >
                  Register
                </button>
              </form>
              <p className="mt-3">
                Already have an account{' '}
                <span
                  style={{ color: 'blue', cursor: 'pointer' }}
                  onClick={() => navigate('/login')}
                >
                  Login here!
                </span>
              </p>

              {registrationResult && (
                <p style={{ color: registrationResult.status === 'error' ? 'red' : 'green' }}>
                  {registrationResult.message}
                </p>
              )}
            </div>
          </div>

        </div>
      </div>
      
    </div>
  );
};

export default Register;
