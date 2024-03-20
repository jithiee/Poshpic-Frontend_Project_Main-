
import React from 'react';
import axiosInstance from '../Redux/axios';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Paymentsuccess = () => {
    const navigate = useNavigate()
    const authToken = localStorage.getItem('authtoken')
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    console.log(sessionId,'hvjh');
    const handleSubmit = async (e) => {
        e.preventDefault();
            try {
              const response = await axiosInstance.post('success/',
                  { session_id: sessionId },
          
                {
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                  },
                }
              );
              
              navigate('/home')
              console.log(response.data); 
            } catch (error) {
              console.error('Error updating payment details:', error);
            }
          };
      
    
    return (
    <div style={styles.container}>
      <div style={styles.tickContainer}>
        <div style={styles.tick}></div>
      </div>
      <h1 style={styles.heading}>Payment Successful</h1>
      <p style={styles.message}>Thank you for your payment. Your transaction was successful.</p>
      <div style={styles.imageContainer}>
      
      </div>
      <button type="button" class="btn btn-success" data-mdb-ripple-init onClick={handleSubmit}>ok</button>
    
    </div>
  );
}


const styles = {
  container: {
    textAlign: 'center',
    margin: '50px auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    marginTop:'15%'
  },
  tickContainer: {
    width: '60px',
    height: '60px',
    margin: '0 auto 20px',  
    borderRadius: '50%',
    border: '3px solid #4CAF50',
    position: 'relative',
    animation: 'tickRotate 0.8s ease-in-out',
  },
  tick: {
    width: '12px',
    height: '24px',
    borderStyle: 'solid',
    borderWidth: '0 3px 3px 0',
    borderColor: '#4CAF50',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) rotate(45deg)',
  },
  heading: {
    color: '#4CAF50',
    fontSize: '2em',
    margin: '10px 0',
  },
  message: {
    fontSize: '1.2em',
    marginBottom: '20px',
  },
  imageContainer: {
    maxWidth: '100%',
    marginBottom: '20px',

  },
  button: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    fontSize: '1em',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',

  },

  '@keyframes tickRotate': {
    '0%': {
      transform: 'translate(-50%, -50%) rotate(0deg)',
    },
    '100%': {
      transform: 'translate(-50%, -50%) rotate(45deg)',
    },
  },
};

export default Paymentsuccess;

