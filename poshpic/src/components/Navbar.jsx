import React, { useEffect, useState } from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from 'mdb-react-ui-kit';
import '../style/Navbar.css';
import { useSpring, animated } from 'react-spring';
import { useNavigate } from 'react-router-dom';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Tabs from '@mui/material/Tabs';
import { Avatar } from '@mui/material';
import { logout, userProfile } from '../Redux/authAction';
import { selectUserProfile } from '../Redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';


const Navbar = () => {


  const [openNavRight, setOpenNavRight] = useState(false);

  const navigate = useNavigate();

  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  const slideInLeft = useSpring({
    marginLeft: '0%',
    from: { marginLeft: '-20%' },
    config: { duration: 800 },
  });

  const slideInRight = useSpring({
    marginRight: '0%',
    from: { marginRight: '-20%' },
    config: { duration: 800 },
  });

  const rotate = useSpring({
    transform: 'rotate(360deg)',
    from: { transform: 'rotate(0deg)' },
    config: { tension: 200, friction: 10 },
  });

  const slideInDown = useSpring({
    marginTop: '0%',
    from: { marginTop: '-10%' },
    config: { duration: 800 },
  });


  const authToken = localStorage.getItem('authtoken');
  const [users, setUsers] = useState()
  const dispatch = useDispatch();
  const userProfileData = useSelector(selectUserProfile);


  useEffect(() => {
    if (authToken) {
      dispatch(userProfile());
    }
  }, [authToken, dispatch]);



  console.log(userProfileData, 'oooooooooooooooooooooooooooo');

  const handleLogout = async () => {
    try {
      dispatch(logout());
      
      navigate('/login');
      // window.location.reload()
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };





  return (
    <div>
      <animated.div style={fadeIn}>

        <MDBNavbar className='container mt-3  homenavbar  p-3' expand='lg' style={{ backgroundColor: '#673EE6', display: 'flex', justifyContent: 'center' }}>



          <MDBContainer fluid>
            <MDBNavbarLink
              className=''
              active

              onClick={() => navigate('/home')}
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontFamily: '-moz-initial',
                fontSize: '25px',
                cursor: 'pointer',
                textDecoration: 'underline overline red',



              }}
            >
              Poshpic
            </MDBNavbarLink>
            <MDBNavbarToggler
              type='button'
              data-target='#navbarRightAlignExample'
              aria-controls='navbarRightAlignExample'
              aria-expanded='false'
              aria-label='Toggle navigation'
              onClick={() => setOpenNavRight(!openNavRight)}
            >
              <animated.div style={rotate}>
                <MDBIcon icon='bars' fas />
              </animated.div>
            </MDBNavbarToggler>

            <MDBCollapse navbar open={openNavRight}>
              <MDBNavbarNav right fullWidth={false} className='mainnavbarhover  mb-2 mb-lg-0'>

                <animated.div style={slideInRight}>
                  <MDBNavbarLink
                    className='ms-3 me-3'
                    active
                    aria-current='page'
                    href='#'
                    aria-disabled="true"
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontFamily: 'monospace',
                      fontSize: '16px',



                    }}


                    onClick={() => navigate('/home')}
                  >
                    HOME
                  </MDBNavbarLink>
                </animated.div>
                <animated.div style={slideInRight}>
                  <MDBNavbarLink
                    onClick={() => navigate('/fasion')}
                    className='ms-3 me-3'
                    active
                    aria-current='page'
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontFamily: 'monospace',
                      fontSize: '16px',
                      cursor: 'pointer'

                    }}
                  >
                    ABOUT

                  </MDBNavbarLink>
                </animated.div>
                <animated.div style={slideInRight}>
                  <MDBNavbarLink
                    onClick={() => navigate('/photographers')}
                    className='ms-3 me-3'
                    active
                    aria-current='page'
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontFamily: 'monospace',
                      fontSize: '16px',
                      cursor: 'pointer'

                    }}
                  >
                    Booking

                  </MDBNavbarLink>
                </animated.div>
                <animated.div style={slideInRight}>
                  <MDBNavbarLink
                    className='ms-3 me-3'
                    active
                    aria-current='page'
                    href='#'
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontFamily: 'monospace',
                      fontSize: '16px',
                    }}

                    onClick={() => navigate('/contact')}
                  >
                    CONTACT
                  </MDBNavbarLink>
                </animated.div>
                <animated.div style={slideInRight}>
                  <MDBNavbarLink
                    className='ms-3 me-3'
                    active
                    aria-current='page'
                    href='#'
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontFamily: 'monospace',
                      fontSize: '16px',
                    }}
                    onClick={() => navigate('/posts')}
                  >
                    POSTS
                  </MDBNavbarLink>
                </animated.div>
         

                <animated.div style={slideInRight}>
                  <MDBNavbarLink
                    className='ms-3 me-3'
                    active
                    aria-current='page'
                    href='#'
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontFamily: 'monospace',
                      fontSize: '16px',
                    }}


                    onClick={handleLogout}
                  >
                    LOGOUT   <LogoutIcon />
                  </MDBNavbarLink>
                </animated.div>
 

        
               
                {userProfileData?.username === 'admin' && (
              <animated.div style={slideInRight}>
                <MDBNavbarLink
                  className='ms-3 me-3'
                  active
                  aria-current='page'
                  href='#'
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontFamily: 'monospace',
                    fontSize: '16px',
                  }}
                  onClick={() => navigate('/viewphotographer')}
                >
                  Admin
                </MDBNavbarLink>
              </animated.div>
            )}



                <animated.div style={slideInDown}>
                  <MDBNavbarLink className='ms-5 me-5' active aria-current='page' href='#' style={{ color: 'white', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '20px' }}>


                  <Avatar onClick={() => navigate(userProfileData?.PhotographerData ? '/photopgrapheruserprofile' : '/userprofile')} alt="Remy Sharp" src="" />
                  
                  
                  
                  </MDBNavbarLink>
                </animated.div>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
      </animated.div>
    </div>
  );
}

export default Navbar;
