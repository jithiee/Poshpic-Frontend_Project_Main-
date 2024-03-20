import React, { useRef, useState } from 'react';
import '../style/otp_reg.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Otp_register = () => {
  const { email } = useParams();
  // console.log(email,'fjkshdfklsajhfiksa');
  const inputRefs = useRef(Array(4).fill(null));
  const [otpValues, setOtpValues] = useState(Array(4).fill(''));
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const nav = useNavigate();

  const handleInputChange = (index, e) => {
    const value = e.target.value;
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleOtpValue = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/otp_verify/',
        {
          email: email,
          otp: otpValues.join(''),
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // console.log('Response:', response);

      if (response.data.error) {
        setErrorMessage(response.data.error);
        setSuccessMessage('');
      } else {
        setErrorMessage('');
        setSuccessMessage('OTP verified successfully.');
        setTimeout(() => {
          nav('/login');
        }, 1000);
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <>
    <div>
      
    </div>
    <div className='otpmain' > 
      <div className="otp-container" >
        <h2 className="otp-heading">Enter OTP</h2>
        <div className="otp-input-container"  >
          {otpValues.map((digit, index) => (
            <input
         
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleInputChange(index, e)}
              className="otp-input "
              style={{color:'lightblue'}}
            />
          ))}
        </div>
        <button type="button" class="btn btn-info  m-3" onClick={handleOtpValue  }  data-mdb-ripple-init>Verify OTP</button>
        {/* <button  className='m-5 bg-info'  onClick={handleOtpValue}>Verify OTP</button> */}
        <p  style={{color:'red'}}  className="error-message   m-2 ">{errorMessage}</p>
        <p className="success-message  text-white">{successMessage}</p>
      </div>
    </div>
    </>
  );
};

export default Otp_register;
