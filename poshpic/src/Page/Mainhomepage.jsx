import React from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Bodyhome from '../components/Bodyhome';
import Footers from '../components/Footers';
import { Navigate } from 'react-router-dom'; 

const Mainhomepage = () => {
  const authToken = localStorage.getItem('authToken');

  // if (!authToken) {
    
  //   return <Navigate to="/login" />;
  // }
  
  return (
    <div>
      <div style={{ position: 'sticky', top: '0px', zIndex: '1' }}>
        <Navbar />
      </div>
      <Header />
      <Bodyhome />
      <Footers />
    </div>
  );
};

export default Mainhomepage;
