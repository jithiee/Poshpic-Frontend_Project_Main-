import React, { useEffect, useState } from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import Divider from '@mui/joy/Divider';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import Check from '@mui/icons-material/Check';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Navbar from './Navbar';
import axiosInstance from '../Redux/axios';
import { useNavigate } from 'react-router-dom';




const Subscrip = () => {

    const authToken = localStorage.getItem('authtoken');
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/payment/', {}, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response && response.data && response.data.url) {
                console.log(response.data.url);
                window.location.href = response.data.url;
                console.log('Payment details:', response.data);
            } else {
                console.error('Unexpected response or missing URL');
            }
        } catch (error) {
            console.error('Error fetching payment details:', error);
        }
    };

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);

        if (query.get('success')) {
            console.log('success');
            navigate('/success')
        }

        if (query.get('canceled')) {
            console.log("Order canceled -- continue to shop around and checkout when you're ready.");
        }
    }, []);


    return (
        <>
            <div className='mb-5'>

                <Navbar />
            </div>
            <div style={{marginLeft:'20%'}} >  
                <Box
                    sx={{

                        width: '100%',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
                        gap: 2,
                    }}
                >
                    <Card size="lg" variant="outlined">
                     
                        <Typography level="h2">Professional</Typography>
                        <Divider inset="none" />
                        <List size="sm" sx={{ mx: 'calc(-1 * var(--ListItem-paddingX))' }}>
                            <ListItem>
                                <ListItemDecorator>
                                    <Check />
                                </ListItemDecorator>
                                Virtual Credit Cards
                            </ListItem>
                            <ListItem>
                                <ListItemDecorator>
                                    <Check />
                                </ListItemDecorator>
                                Financial Analytics
                            </ListItem>
                            <ListItem>
                                <ListItemDecorator>
                                    <Check />
                                </ListItemDecorator>
                                Checking Account
                            </ListItem>
                            <ListItem>
                                <ListItemDecorator>
                                    <Check />
                                </ListItemDecorator>
                                API Integration
                            </ListItem>
                        </List>
                        <Divider inset="none" />
                        <CardActions>
                            <Typography level="title-lg" sx={{ mr: 'auto' }}>
                        US$25.00               <Typography fontSize="sm" textColor="text.tertiary">
                                    / Year
                                </Typography>
                            </Typography>
                          <form action="" onSubmit={handleSubmit} >
                            <Button
                                variant="soft"
                                color="neutral"
                                endDecorator={<KeyboardArrowRight />}
                                type='submit'
                            >
                                Start now
                            </Button>
                            </form>  


                        </CardActions>
                    </Card>
                    <Card
                        size="lg"
                        variant="solid"
                        color="neutral"
                        invertedColors
                        sx={{ bgcolor: 'neutral.900' }}
                    >
                     
                        <Typography level="h2">Unlimited</Typography>
                        <Divider inset="none" />
                        <List
                            size="sm"
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                mx: 'calc(-1 * var(--ListItem-paddingX))',
                               
                            }}
                        >
                            <ListItem>
                                <ListItemDecorator>
                                <p style={{color:'green'}} >  <Check /></p> 
                                </ListItemDecorator>
                                Virtual Credit Cards
                            </ListItem>
                            <ListItem>
                                <ListItemDecorator>
                                <p style={{color:'green'}} >  <Check /></p> 
                                </ListItemDecorator>
                                Financial Analytics
                            </ListItem>
                            <ListItem>
                                <ListItemDecorator>
                                <p style={{color:'green'}} >  <Check /></p> 
                                </ListItemDecorator>
                                Checking Account
                            </ListItem>
                            <ListItem>
                                <ListItemDecorator>
                                  <p style={{color:'green'}} >  <Check /></p> 
                                </ListItemDecorator>
                                API Integration
                            </ListItem>
                            <ListItem>
                                <ListItemDecorator>
                                <p style={{color:'green'}} >  <Check /></p> 
                                </ListItemDecorator>
                                Cancel Anytime
                            </ListItem>
                        </List>
                        <Divider inset="none" />
                        <CardActions>
                            <Typography level="title-lg" sx={{ mr: 'auto' }}>
                            US$59{''}
                                <Typography fontSize="sm" textColor="text.tertiary">
                                    / Year
                                </Typography>
                            </Typography>
                            <Button endDecorator={<KeyboardArrowRight />} style={{backgroundColor:'red' , color:'white '}}> Not Available</Button>
                        </CardActions>
                    </Card>
                </Box>
                
            </div>
        </>
    );
}

export default Subscrip;
