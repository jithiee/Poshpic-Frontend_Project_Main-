// import React from 'react';
// import { Container, Typography, Button, Avatar, Grid, Card, CardContent } from '@mui/material';
// import { keyframes } from '@emotion/react';
// import '../style/Follow.css';
// import Userprofile from './Userprofile';
// import Navbar from './Navbar';
// import { MDBBtn } from 'mdb-react-ui-kit';
// import { useNavigate } from 'react-router-dom';

// const fadeIn = keyframes`
//   from {
//     opacity: 0;
//   }
//   to {
//     opacity: 1;
//   }
// `;

// const pulse = keyframes`
//   from {
//     transform: scale(1);
//   }
//   to {
//     transform: scale(1.04);
//   }
// `;

// const Follow = () => {

//   const navigate = useNavigate()
//   return (
//     <>

//       <Navbar />

//       <MDBBtn className='m-5' style={{ backgroundColor: 'black' }} onClick={() => navigate('/userprofile')} >Back page</MDBBtn>
//       <Container sx={{ mt: 2 }}>
//         <Typography variant="h4" gutterBottom className=''>
//           <p style={{ fontWeight: 'bold', color: '#ff006e' }} > Following Photographers</p>
//           <hr /> <br />
//         </Typography>
//         <Grid container spacing={2} className='followcard' >
//           {Array.from({ length: 6 }).map((_, index) => (
//             <Grid item key={index} xs={12} sm={6} md={4}>
//               <Card sx={{ animation: `${fadeIn} 0.5s ease-in-out`, '&:hover': { animation: `${pulse} 0.3s ease-in-out infinite alternate` } }}>
//                 <CardContent>
//                   <Avatar sx={{ width: 60, height: 60, margin: 'auto' }} alt={`User ${index + 1}`} src={`https://i.pravatar.cc/150?img=${index + 1}`} />
//                   <Typography variant="h6" sx={{ mt: 2 }}>
//                     User {index + 1}
//                   </Typography>
//                   <Button variant="contained" color="primary" sx={{ mt: 2 }}>
//                     Following
//                   </Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </>
//   );
// };

// export default Follow;
import React from 'react';

const Follow = () => {
  return (
    <div>
      hgjhg 
    </div>
  );
}

export default Follow;
