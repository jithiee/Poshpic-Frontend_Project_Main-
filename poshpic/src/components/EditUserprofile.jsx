import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';
import Userprofile from './Userprofile';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserProfile } from '../Redux/authSlice';
import { userProfile } from '../Redux/authAction';
import axiosInstance from '../Redux/axios';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const EditUserprofile = () => {

  
  
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const authToken = localStorage.getItem('authtoken');

  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [phone, setPhone] = useState();
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [photoaddress, setPhotoAddress] = useState('');
  
  const [specialty, setSpecialty] = useState('');
  const [experience, setExperience] = useState('');
  const [amount, setAmount] = useState();
  const [status, setStatus] = useState(false);
 
  const [profile_image, setProfile_image] = useState('');


  const [successMsg, setSuccessMsg] = useState('');
  
  const userProfileData = useSelector(selectUserProfile);
  
  
  useEffect(() => {
    if (authToken) {
      dispatch(userProfile());
    }
  }, [authToken, dispatch]);
  
  useEffect(() => {
    if (userProfileData) {
      setFirstName(userProfileData.first_name || '');
      setLastName(userProfileData.last_name || '');
      setPhone(userProfileData?.phone || '');
      setCity(userProfileData?.city || '');
      setAddress(userProfileData?.address || '');
      setSpecialty(userProfileData?.PhotographerData?.specialty || '')
      setExperience(userProfileData?.PhotographerData?.experience || '')
      setStatus(userProfileData?.PhotographerData?.status || '')
      setPhotoAddress(userProfileData?.PhotographerData?.address || '');
      setProfile_image(userProfileData?.PhotographerData?.profile_image || '');
      setAmount(userProfileData?.PhotographerData?.amount || '');
      
    }
  }, [userProfileData]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('first_name', first_name);
      formData.append('last_name', last_name);
      formData.append('userData.phone', phone);
      formData.append('userData.address', address || '');
      formData.append('userData.city', city || '');
      formData.append('useData.profile_image',profile_image || '' );  
      if (userProfileData.PhotographerData != null) {
        formData.append('PhotographerData.specialty', specialty || '');
        formData.append('PhotographerData.experience', experience || '');
        formData.append('PhotographerData.address', photoaddress || '');
        formData.append('PhotographerData.amount', amount || '');
        formData.append('PhotographerData.status', status || false );

      }

      console.log( 'fffooooooooooooooooo');

      const response = await axiosInstance.patch('userprofile/',formData, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      
       console.log(formData , 'fffffffffffffffffffffffff'); 
      if (response.status === 200) {
        setSuccessMsg("Successfully updated");
      }

    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };


  return (

    <>

      <Navbar /> 
      <Container className='mt-5 mb-5' component="main" maxWidth="xs">
        <Paper
          elevation={3}
          style={{
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',

          }}
        >
          <h3 style={{

            fontFamily: 'Arial, sans-serif',
            textAlign: 'center',
          }}>
        
         
     

          {successMsg && (
            <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity="success" onClose={() => setSuccessMsg('')}>
                  {successMsg}
                </Alert>
              </Stack>
            )}
          
            Update Profile
          </h3>



          <Typography variant="h5" style={{ marginBottom: 8, color: 'white' }}>
            Edit User Profile
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>

           <Button className='' style={{border:'1px solid black', backgroundColor:'ButtonFace'}}>

            <input type="file"
               fullWidth
               label="profile_image"
               variant="outlined"
               margin="normal"
               name="profile_image"
              //  value={profile_image}
               onChange={(e) => setProfile_image(e.target.files[0])}
               /> Upload image
            
        
          </Button>

            <TextField
              fullWidth
              label="First Name"
              variant="outlined"
              margin="normal"
              name="first_name"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              InputProps={{
                style: {
                  background: 'rgba(255, 255, 255, 0.8)',
                },
              }}
            />
            <TextField
              fullWidth
              label="Last Name"
              variant="outlined"
              margin="normal"
              name="last_name"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              InputProps={{
                style: {
                  background: 'rgba(255, 255, 255, 0.8)',
                },
              }}
            />

            <TextField
              fullWidth
              type='text'
              label="City"
              variant="outlined"
              margin="normal"
              name="city"
              value={userProfileData?.city}
              onChange={(e) => setCity(e.target.value)}
              
              InputProps={{
                style: {
                  background: 'rgba(255, 255, 255, 0.8)',
                },
              }}
            />
            <TextField
              fullWidth
              type='number'
              label="phone Number"
              variant="outlined"
              margin="normal"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              InputProps={{
                style: {
                  background: 'rgba(255, 255, 255, 0.8)',
                },
              }}
            />
            {userProfileData?.userData !== null && (
              <>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Address"
                  multiline
                  maxRows={4}
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}

                  InputProps={{
                    style: {
                      background: 'rgba(255, 255, 255, 0.8)',
                    },
                  }}
                />
              </>
            )}
            {userProfileData?.PhotographerData !== null && (
              <>
                <TextField
                  fullWidth
                  type='text'
                  label="Specialty"
                  variant="outlined"
                  margin="normal"
                  name="specialty"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  InputProps={{
                    style: {
                      background: 'rgba(255, 255, 255, 0.8)',
                    },
                  }}
                />
                <TextField
                  fullWidth
                  type='text'
                  label="Experience"
                  variant="outlined"
                  margin="normal"
                  name="experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  InputProps={{
                    style: {
                      background: 'rgba(255, 255, 255, 0.8)',
                    },
                  }}
                />
                <TextField
                  fullWidth
                  type='text'
                  label="Amount"
                  variant="outlined"
                  margin="normal"
                  name="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  InputProps={{
                    style: {
                      background: 'rgba(  255, 255, 255, 0.8)',
                    },
                  }}
                />
                <TextField
                  id="outlined-multiline-flexible"
                  label="Address"
                  multiline
                  maxRows={4}
                  name="photoaddress"
                  value={photoaddress}
                  onChange={(e) => setPhotoAddress(e.target.value)}

                  InputProps={{
                    style: {
                      background: 'rgba(255, 255, 255, 0.8)',
                    },
                  }}
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={status}
                      onChange={(e) => setStatus(e.target.checked)}
                      name="status"
                    />
                  }
                  label="Status"
                />

              </>
            )}

            <br />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{
                marginTop: 16,
                backgroundColor:'blue'

              }}
              
              >
              Save Changes
            </Button>
          </form>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: 0.5,
              zIndex: -1,
            }}
          />
        </Paper>
      </Container>
    </>
  );
};

export default EditUserprofile;



