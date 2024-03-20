import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from 'mdb-react-ui-kit';

import { Typography, Button, Avatar, Grid, Card, CardContent } from '@mui/material';
import Footers from '../Footers';
import axios from 'axios';

const PhotoNavbar = () => {
  const navigate = useNavigate();
  const [photographers, setPhotographers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
console.log(photographers,"hdshdkshdhskdjhsakdhksjhksa");

  useEffect(() => {
    // Fetch photographers when the component mounts
    fetchPhotographers();
  }, []);


  const fetchPhotographers = async () => {
    try {

      const response = await axios.get('http://127.0.0.1:8000/photographerlist/');
      console.log(response, 'lllllllllllllrrr ');
      setPhotographers(response.data);
    } catch (error) {
      console.error('Error fetching photographers:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const lowercaseQuery = searchQuery.toLowerCase();
      console.log('Search Query:', lowercaseQuery); 
      const response = await axios.get(`http://127.0.0.1:8000/phtotgraphersearch/?query=${lowercaseQuery}`);
      console.log(response, 'ooooooooooo');
      setPhotographers(response.data);
    } catch (error) {
      console.error('Error searching photographers:', error);
    }
  };

  const handleBooking = (userId) => {
    navigate(`/booking/${userId}`);
  };

  
  return (
    <>
      <div style={{ backgroundColor: '#f8f1e5' }} >


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <MDBNavbar
            expand='lg'
            className=' mt-3 '
            style={{
              backgroundColor: '#673EE6',
              position: 'sticky',
              top: '0px',
              border: '2px solid #674cc4',


            }}
          >
            <MDBContainer fluid >
              <MDBNavbarBrand href='#'>
                <img
                
                
                  src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/photography-logo%2C-photography-studio-logo-design-template-42261fff3bd70db2b7e9b5338fa1c03a_screen.jpg?ts=1667205867"
                  alt="Logo"
                  style={{ height: '50px', width: 'auto', borderRadius: '50px', border: '2px solid #674cc4' }}
                  onClick={() => navigate('/home')}
                />
              </MDBNavbarBrand>

              <MDBNavbarToggler
                type='button'
                data-target='#navbarCollapse'
                aria-controls='navbarCollapse'
                aria-expanded='false'
                aria-label='Toggle navigation'
              >
                <MDBIcon fas icon='bars' style={{ color: 'white' }} />
              </MDBNavbarToggler>

              <MDBCollapse navbar id='navbarCollapse'>
                {/* <MDBNavbarNav className='me-auto mb-2 mb-lg-0'>
                  <MDBNavbarItem>
                    <MDBDropdown>
                      <MDBDropdownToggle
                        tag='a'
                        className='nav-link'
                        style={{ color: 'white', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '18px', cursor: 'pointer', }}
                      >
                        Filter Photographer
                      </MDBDropdownToggle>
                      <MDBDropdownMenu className='filterhomepage' style={{ fontSize: '15px', backgroundColor: 'HighlightText', fontFamily: 'monospace' }}>
                        <MDBDropdownItem link>Portrait Photographer</MDBDropdownItem>
                        <MDBDropdownItem link>Landscape Photographer</MDBDropdownItem>
                        <MDBDropdownItem link>Wedding Photographer</MDBDropdownItem>
                        <MDBDropdownItem link>Wildlife Photographer</MDBDropdownItem>
                        <MDBDropdownItem link>Fashion Photographer</MDBDropdownItem>
                        <MDBDropdownItem link>Sports Photographer</MDBDropdownItem>
                        <MDBDropdownItem link>Macro Photographer</MDBDropdownItem>
                        <MDBDropdownItem link>Architectural Photographer</MDBDropdownItem>
                        <MDBDropdownItem link>Product Photographer</MDBDropdownItem>
                        <MDBDropdownItem link>Food Photographer</MDBDropdownItem>
                        <MDBDropdownItem link>Street Photographer</MDBDropdownItem>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBNavbarItem>
                </MDBNavbarNav> */}

                <form className='d-flex'>
                  <div className='input-group'>
                    <input
                      type='search'
                      placeholder='Search'
                      className='form-control ms-4'
                      style={{ backgroundColor: 'white', color: 'black', border: '1px solid white', width: '800px' }}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button id='search-button' type='button' className='btn btn-white ms-2' 
                        onClick={handleSearch}
                     
                     >
                      <i className='fas fa-search'></i>
                    </button>
                  </div>
                </form>
              </MDBCollapse>
            </MDBContainer>
          </MDBNavbar>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>

            <Grid container spacing={3} style={{ padding: '5%' }} >
              {photographers.map((photographer ,index ) => (
                <Grid key={index} item xs={12} sm={6} md={4}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card style={{ border: '1px solid #3498db', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginTop: '5%' }}>
                      <CardContent>
                        <Avatar
                       
                          sx={{ width: 80, height: 80, margin: 'auto', border: '4px solid #3498db' }}
                          
                          src={`https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg`}
                          alt="Avatar"
                          
                        />


                        <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold', color: '#2c3e50', textAlign: 'center' }}>
                          {photographer.username} 
                        </Typography>
                        <Typography variant="subtitle1" sx={{ color: '#7f8c8d', textAlign: 'center' }}>
                            Specialty: {photographer?.PhotographerData?.specialty || 'Not specified'}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ color: 'green', textAlign: 'center' }}>
                          {photographer?.PhotographerData?.status == true ? <p style={{ color: 'green' }}> Available </p> : <p style={{ color: 'red' }}> Not 
                           Available </p>}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ color: 'blue', textAlign: 'center', fontWeight: 'bold' }}> ₹
                        {photographer?.PhotographerData?.amount}  / per day
                        </Typography>
                        {photographer?.PhotographerData?.status == true ?
                        <Button variant="contained" color="primary" sx={{ mt: 3, borderRadius: '25px', width: '100%', backgroundColor: '#3498db', '&:hover': { backgroundColor: '#2980b9' } }} onClick={() => handleBooking(photographer.PhotographerData.user_id)}>
                          Book Now
                        </Button>
                        :
                        <Button variant="" sx={{ mt: 3, borderRadius: '25px', width: '100%', backgroundColor: 'red',  }}>
                          Available soon
                        </Button>
                        }
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>

              ))}

            </Grid>



          </div>
        </motion.div>
      </div>
      <Footers />
    </>
  );
};

export default PhotoNavbar;
