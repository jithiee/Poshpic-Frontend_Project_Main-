import React from 'react';
import Navbar from '../components/Navbar';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { useSpring, animated } from 'react-spring';

const Fasion = () => {


  const keyFeatures = [
    {
      title: 'Easy Booking',
      description: ' Our user-friendly interface allows you to browse through a curated list of photographers, check their portfolios, and book your preferred one in just a few clicks',
    },
    {
      title: 'Diverse Specializations',
      description: 'Whether its a wedding, corporate event, portrait session, or any other occasion, we have photographers with diverse skills to meet your specific needs.',
    },
    {
      title: 'Secure Payments',
      description: ' Your transactions are secure with our reliable payment system. make a payment, and focus on enjoying your event while we handle the rest',

    },
    {
      title: 'Real-Time Availability',
      description: 'Check photographers real-time availability, making it convenient for you to plan your events accordingly.',
    },
    {
      title: 'Instant Confirmation',
      description: ' Receive instant booking confirmation along with details about your chosen photographer and the agreed-upon terms.',
    },
    {
      title: 'Customer Support:',
      description: ' Have questions or need assistance? Our dedicated customer support team is ready to help you every step of the way.',
    },
  ];

  const animatedProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 800 },
  });

  return (
    <div style={{ minHeight: '100vh' }}>
      <div  style={{position:'sticky' , top:'0'}}> 

    <Navbar style={{  color: '#fff' }} />
      </div>
    <Container
      maxWidth="md"
      style={{
        marginTop: '50px',
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        marginBottom:'50px'
      }}
    >
      <animated.div style={animatedProps}>
        <Typography
          variant="h4"
          gutterBottom
          className="text-center mb-5"
          style={{ fontWeight: 'bold', color: '#333' }}
        >
          Welcome to <span style={{ color: '#ff3366' }}>POSPIC</span>
        </Typography>
        <hr />
        <Typography
          variant="h5"
          paragraph
          style={{
            color: '#333',
            marginBottom: '60px',
            fontSize: '1.2em',
          }}
        >
          Looking for a professional photographer to capture your special
          moments? Look no further! Our platform connects you with skilled
          photographers who can turn your memories into timeless masterpieces.
        </Typography>
      </animated.div>

      <Grid container spacing={3} className="mb-5">
        {keyFeatures.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <animated.div style={{ ...animatedProps, display: 'inline-block' }}>
              <Card
                className="feature-card"
                style={{
                  
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s',
                  ':hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    style={{ color: '#333' }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ color: '#666', lineHeight: '1.4' }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </animated.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  </div>
  );
};

export default Fasion;
