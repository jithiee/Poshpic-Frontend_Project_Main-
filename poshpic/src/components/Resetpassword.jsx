import React from 'react';

import '../style/Resetpassword.css'

const Resetpassword = () => {
  return (
    <div className="reset-password-container" style={{ backgroundImage: "url(https://img.freepik.com/free-vector/abstract-watercolor-background_23-2149038179.jpg?w=996&t=st=1706347796~exp=1706348396~hmac=4ffef9379964c84539b8bfe1a333c077e5c7ce8ced3fb63f3188884eb437bda9)",backgroundSize:'cover' }}>
      <div className="reset-password-form">
        <h2 className="reset-password-heading">Reset Password</h2>
        <form>
          <div className="form-group">
            <label htmlFor="newPassword" className="form-label">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className="form-input"
              placeholder="Enter your new password"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="form-input"
              placeholder="Confirm your new password"
              required
            />
          </div>
          <button type="submit" className="reset-password-button">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default Resetpassword;
