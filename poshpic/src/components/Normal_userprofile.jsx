import React, { useEffect, useState } from 'react';
import '../style/Userprofile.css';
import { useNavigate } from 'react-router-dom';
import EditNoteIcon from '@mui/icons-material/EditNote';
import "bootstrap/dist/css/bootstrap.css";
import Navbar from './Navbar';
import { MDBBtn } from 'mdb-react-ui-kit';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MessageIcon from '@mui/icons-material/Message';
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import LogoutIcon from '@mui/icons-material/Logout';
// import { selectUserProfile } from '../Redux/authSlice'; 

import { useDispatch, useSelector } from 'react-redux';
import { userProfile } from '../Redux/authAction';
import { selectUserProfile } from '../Redux/authSlice';
import Avatar from '@mui/material/Avatar';

const Normal_userprofile = () => {
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();
  const [imageURL, setImageURL] = useState('');

  const authToken = localStorage.getItem('authtoken');
  // console.log('token', authToken);


  const [users, setUsers] = useState()
  const dispatch = useDispatch();
  const userProfileData = useSelector(selectUserProfile);

  useEffect(() => {
    if (authToken) {
      dispatch(userProfile());
    }
  }, [authToken, dispatch]);






  
  useEffect(() => {
    if (userProfileData && userProfileData.userData && userProfileData.userData.profile_image) {
      // Assuming userProfileData.userData.profile_image is a URL
      setImageURL(userProfileData.userData.profile_image);
    }
  }, [userProfileData]);
  




  return (
    <div>

      <Navbar />

      <div>
        <div className="container mt-5  ">
          <div className="main-body">



            <div className="row gutters-sm">
              <div className="col-md-4 mb-3">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex flex-column align-items-center text-center">
                   
                    {userProfileData && userProfileData.userData && userProfileData.userData.profile_image && (
  <Avatar
    alt="User Avatar"
    // src={URL.createObjectURL ( userProfileData.userData.profile_image)   }
    src={imageURL}
    sx={{ width: 100, height: 100 }}
  />
)}

                      <div className="mt-3">
                        <h4>{userProfileData?.username} </h4>
                        <p>{userProfileData?.email}</p>




                      </div>
                    </div>
                  </div>
                </div>
                <div className="carduser card mt-3 p-3" style={{ textAlign: 'center', alignContent: 'center' }}>
                  <ul className="list-group list-group-flush"  >
                    <li className="list-group-item  d-flex justify-content-between align-items-center flex-wrap">
                      <MDBBtn outline rounded className='mx-2'  onClick={()=>navigate('/chat')} >

                        <MessageIcon />  Message
                      </MDBBtn>
                    </li>

                    <li className="  list-group-item d-flex justify-content-between align-items-center flex-wrap " >
                      <MDBBtn outline rounded className='mx-2' >
                        < CircleNotificationsIcon />  Notifications
                      </MDBBtn>
                    </li>

                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <MDBBtn outline rounded className='mx-2' >

                        <LibraryBooksIcon />  Booking details
                      </MDBBtn>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <MDBBtn outline rounded className='mx-2' >

                        <AccountBalanceIcon />  Payment details
                      </MDBBtn>

                    </li>
          
               


                  </ul>
                </div>
              </div>
              <div className="col-md-8">
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Username</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {userProfileData?.username}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">First Name</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {userProfileData?.first_name}

                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Last Name</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {userProfileData?.last_name}

                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Email</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {userProfileData?.email}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Phone</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {userProfileData?.userData?.phone}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">City</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {userProfileData?.userData?.city}
                       

                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Address</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {userProfileData?.userData?.address
                        }
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-12">
                        <a className="btn btn-info " target="__blank" onClick={() => navigate('/edituserprofile')}  > <EditNoteIcon /> Edit Profile </a>
                      </div>
                    </div>
                  </div>
                </div>



              </div>
            </div>

          </div>
        </div>


      </div>




    </div>
  );
}

export default Normal_userprofile;
