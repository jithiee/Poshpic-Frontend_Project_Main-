import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';

const Profile_User = () => {
  return (
    <div>
         <div style={sidebarStyle}>
      <div style={profileContainerStyle}>
        <img src="user-profile.jpg" alt="User Profile" style={profileImageStyle} />
        <p style={profileNameStyle}>Username</p>
      </div>
      <div style={iconContainerStyle}>
        <FontAwesomeIcon icon={faHome} style={iconStyle} />
        <FontAwesomeIcon icon={faSearch} style={iconStyle} />
        <FontAwesomeIcon icon={faHeart} style={iconStyle} />
        <FontAwesomeIcon icon={faUser} style={iconStyle} />
      </div>
    </div>
    </div>
  );
}
const sidebarStyle = {
  width: '80px',
  height: '100%',
  backgroundColor: '#2e2e2e',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px 0',
  position: 'fixed',
};

const profileContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '20px',
};

const profileImageStyle = {
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  marginBottom: '10px',
  border: '2px solid #fff',
};

const profileNameStyle = {
  color: '#fff',
  fontSize: '14px',
};

const iconContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const iconStyle = {
  color: '#fff',
  fontSize: '24px',
  margin: '10px 0',
  cursor: 'pointer',
};

export default Profile_User;
