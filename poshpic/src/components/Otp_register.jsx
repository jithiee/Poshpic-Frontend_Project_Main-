import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Otp_register = () => {
  const { email } = useParams();
  const inputRefs = useRef(Array(4).fill(null));
  const [otpValues, setOtpValues] = useState(Array(4).fill(''));
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();

  // Gradient background animation (matches registration page)
  useEffect(() => {
    const interval = setInterval(() => {
      document.documentElement.style.setProperty(
        '--gradient-angle',
        `${Math.floor(Math.random() * 360)}deg`
      );
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (index, e) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow numbers
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    } else if (!value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleOtpValue = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

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

      if (response.data.error) {
        setErrorMessage(response.data.error);
      } else {
        setSuccessMessage('OTP verified successfully! Redirecting...');
        setTimeout(() => {
          nav('/login');
        }, 1500);
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
      setErrorMessage(error.response?.data?.error || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-br from-indigo-50 to-purple-100 text-gray-800'}`}>
      <style>{`
        :root {
          --gradient-angle: 45deg;
        }
        .gradient-bg {
          background: linear-gradient(
            var(--gradient-angle),
            rgba(135, 100, 255, 0.1),
            rgba(200, 150, 255, 0.05),
            rgba(255, 255, 255, 0)
          );
          transition: background 8s ease;
        }
      `}</style>

      <div className={`w-full max-w-md rounded-3xl overflow-hidden shadow-xl transition-all duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="gradient-bg p-8 relative">
          {/* Dark Mode Toggle (matches registration) */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`absolute top-4 right-4 p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>

          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold mb-2">LensCraft</h1>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Verify your account</p>
          </div>

          <div className="text-center mb-4">
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              We've sent a verification code to<br />
              <span className="font-medium text-purple-600 dark:text-purple-400">{email}</span>
            </p>
          </div>

          <form onSubmit={handleOtpValue}>
            <div className="flex justify-center gap-3 mb-8">
              {otpValues.map((digit, index) => (
                <input
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleInputChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`w-16 h-16 text-2xl text-center rounded-lg border-2 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 transition-all ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                  }`}
                  autoFocus={index === 0}
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={isLoading || otpValues.some(v => !v)}
              className={`w-full py-3 rounded-lg font-medium transition-all ${
                isLoading || otpValues.some(v => !v)
                  ? 'bg-purple-400 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700'
              } text-white shadow-md flex items-center justify-center`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </>
              ) : (
                'Verify OTP'
              )}
            </button>
          </form>

          {errorMessage && (
            <div className="mt-4 p-3 rounded-lg bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 text-center">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="mt-4 p-3 rounded-lg bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-center">
              {successMessage}
            </div>
          )}

          <div className="mt-6 text-center text-sm">
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Didn't receive code?{' '}
              <button
                type="button"
                onClick={() => {
                  // Add resend OTP logic here
                  setOtpValues(Array(4).fill(''));
                  inputRefs.current[0].focus();
                }}
                className="text-purple-600 hover:underline dark:text-purple-400 font-medium"
              >
                Resend OTP
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp_register;  