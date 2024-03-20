import React, { useEffect, useState } from 'react';
import '../style/Userprofile.css'
import { useNavigate, useParams } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import ClearIcon from '@mui/icons-material/Clear';
import EditNoteIcon from '@mui/icons-material/EditNote';
import "bootstrap/dist/css/bootstrap.css";
import Nabbarphoto from './Photographer/Nabbarphoto';
import { selectUserProfile } from '../Redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { logout, userProfile } from '../Redux/authAction';
import { Button } from '@mui/material';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import PhotographerBody from './Photographer/PhotographerBody';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import axios from 'axios';
import SourceIcon from '@mui/icons-material/Source';

const User_profileBody = () => {

  const { id } = useParams()

  const [clicked, setClicked] = useState(false)
  const navigate = useNavigate()
  const handileClicked = () => {
    setClicked(!clicked);
    console.log('hhhihiih');
  }
  console.log('nooooo');

  const authToken = localStorage.getItem('authtoken');
  console.log('token', authToken)






  const getuser = async (id) => {
    console.log(id);
    try {

      const response = await axios.get(
        `http://127.0.0.1:8000/getuserid/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response);

      if (response.status === 200) {

        // console.log(response.data);
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  useEffect(() => {
    if (authToken) {
      getuser(id)
    }
  }, [id, authToken])


  const [users, setUsers] = useState()
  const dispatch = useDispatch();
  const userProfileData = useSelector(selectUserProfile);


  useEffect(() => {
    if (authToken) {
      dispatch(userProfile());
    }
  }, [authToken, dispatch]);

  console.log(userProfileData, 'ooooooooooooooooooooooooooooii  ');

  const handleLogout = async () => {
    try {
      dispatch(logout());
      navigate('/login');
      window.location.reload()
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };


  return (
    <div>
      <div className="container  ">
        <div className="main-body" >
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" alt="Admin" className="rounded-circle" width="150" />
                    <div className="mt-3">
                      <h4>{userProfileData?.username} </h4>
                      <p className="text-secondary mb-1">{userProfileData?.PhotographerData?.specialty} Photographer</p>
                      {/* <p className="text-info" style={{ fontWeight: 'bold' }} >   <span>  1.5M  </span> Followers </p> */}
                      <div className="mt-3">


                        <button className={`btn btn-primary m-1 button-animation ${clicked ? 'clicked' : ''} `}

                          onClick={() => navigate('/view')}
                        >


                          Posts  <SourceIcon />

                        </button>

                      </div>


                    </div>
                  </div>
                </div>
              </div>

              <div className="card mt-3">
                <ul className="list-group list-group-flush">


                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-twitter mr-2 icon-inline text-info"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>Twitter</h6>
                    <span className="text-secondary">@wwww</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-instagram mr-2 icon-inline text-danger"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>Instagram</h6>
                    <span className="text-secondary">fadsf</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-facebook mr-2 icon-inline text-primary"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>Facebook</h6>
                    <span className="text-secondary">asfda</span>
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
                      {userProfileData?.PhotographerData?.phone}
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Specialty</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userProfileData?.PhotographerData?.specialty}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Amount</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userProfileData?.PhotographerData?.amount}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">City</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userProfileData?.PhotographerData?.city}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Experience</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userProfileData?.PhotographerData?.experience}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Status</h6>
                    </div>


                    <div className="col-sm-9 text-secondary">
                      {userProfileData?.PhotographerData?.status === false ? (
                        <span style={{ color: 'red' }}>Not available</span>
                      ) : (
                        <span style={{ color: 'green' }}>Available</span>
                      )}
                    </div>


                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Address</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userProfileData?.PhotographerData?.address}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-12">
                      {userProfileData?.PhotographerData === null ? null : (
                        <ul style={{ display: 'flex', gap: '2%', listStyle: 'none' }}>
                          <li>
                            <a className="btn btn-info " target="__blank" onClick={() => navigate('/edituserprofile')}>
                              <EditNoteIcon /> Edit Profile
                            </a>
                          </li>
                          <li onClick={() => navigate('/sub')} >

                            <Button> subscription</Button>
                          </li>
                          <li>
                            <a className="btn btn-dark " target="__blank" onClick={() => navigate('/createpost')}>
                              <SaveAsIcon /> Create
                            </a>
                          </li>
                          <li>
                            <a className="btn  " target="__blank" onClick={() => navigate('/history')} style={{ backgroundColor: 'red', color: 'white' }}>
                              <ManageHistoryIcon /> History 
                            </a>
                          </li>

                       
                        </ul>
                      )}




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

export default User_profileBody;


