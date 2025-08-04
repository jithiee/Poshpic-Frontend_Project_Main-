import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();

  // Form states
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [isPhotographer, setIsPhotographer] = useState(false);

  // UI states
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState('');

  // Gradient background animation
  useEffect(() => {
    const interval = setInterval(() => {
      document.documentElement.style.setProperty(
        '--gradient-angle',
        `${Math.floor(Math.random() * 360)}deg`
      );
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);

    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;
    setPasswordStrength(strength);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    const formData = {
      username,
      email,
      password,
      confirm_password: confirmPassword,
      phone,
      is_photographer: isPhotographer,
    };

    try {
      const res = await axios.post('http://127.0.0.1:8000/register/', formData);
      if (res.data.message) {
        navigate(`/otp-verify/${email}`);
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('Server error. Please try later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${darkMode ? 'bg-gray-900 text-black' : 'bg-gradient-to-br from-indigo-50 to-purple-100 text-gray-800'}`}>
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

      <div className="w-full max-w-2xl rounded-3xl overflow-hidden shadow-xl bg-white dark:bg-gray-800 transition-all">
        <div className="flex flex-col md:flex-row">
          {/* Left Panel */}
          <div className="md:w-2/5 gradient-bg p-6">
            <h1 className="text-3xl font-bold mb-2">LensCraft</h1>
            <p className="opacity-70">Capture moments, create memories.</p>
            <img
              src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop"
              alt="Photographer"
              className="rounded-lg shadow-md mt-6 hidden md:block"
            />
          </div>

          {/* Right Panel */}
          <div className="md:w-3/5 p-6 relative">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="absolute top-4 right-4 text-xl"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>

            {/* Step Indicator */}
            <div className="flex mb-6">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= i ? 'bg-purple-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                    {i}
                  </div>
                  {i < 2 && <div className="w-8 h-1 bg-gray-300 dark:bg-gray-600"></div>}
                </div>
              ))}
            </div>

            {error && (
              <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
            )}

            {/* Step 1 */}
            {step === 1 ? (
              <>
                <h2 className="text-2xl font-semibold mb-4">Join LensCraft</h2>

                {/* Role Switch */}
                <div className="flex gap-4 mb-4">
                  <button
                    onClick={() => setIsPhotographer(false)}
                    className={`flex-1 py-2 rounded ${!isPhotographer ? 'bg-purple-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
                  >
                    👤 User
                  </button>
                  <button
                    onClick={() => setIsPhotographer(true)}
                    className={`flex-1 py-2 rounded ${isPhotographer ? 'bg-purple-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
                  >
                    📸 Photographer
                  </button>
                </div>

                <div className="mb-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full p-3 border-b border-gray-300 bg-transparent outline-none"
                    required
                  />
                </div>

                <div className="mb-4">
                  <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Password"
                    className="w-full p-3 border-b border-gray-300 bg-transparent outline-none"
                    required
                  />
                  {passwordStrength > 0 && (
                    <div className="flex gap-1 mt-2">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full ${
                            i < passwordStrength
                              ? passwordStrength >= 3
                                ? 'bg-green-500'
                                : passwordStrength >= 2
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                              : 'bg-gray-200 dark:bg-gray-700'
                          }`}
                        ></div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    placeholder="Confirm Password"
                    className="w-full p-3 border-b border-gray-300 bg-transparent outline-none"
                    required
                  />
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded shadow"
                >
                  Continue
                </button>
              </>
            ) : (
              <>
                {/* Step 2 */}
                <h2 className="text-2xl font-semibold mb-4">Complete Profile</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Username"
                      className="w-full p-3 border-b border-gray-300 bg-transparent outline-none"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone"
                      className="w-full p-3 border-b border-gray-300 bg-transparent outline-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded shadow flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                        </svg>
                        Creating Account...
                      </>
                    ) : (
                      'Register Now'
                    )}
                  </button>
                </form>
              </>
            )}

            <p className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-purple-600 hover:underline"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
