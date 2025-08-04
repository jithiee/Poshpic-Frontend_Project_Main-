import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import PhotographerBody from './PhotographerBody';
import { useNavigate, useParams } from 'react-router-dom'; 
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserProfile } from '../../Redux/authSlice';
import { userProfile } from '../../Redux/authAction';

const ViewPhotographer = ( ) => {
  
    const navigate = useNavigate()
    const [isFollowing, setIsFollowing] = useState(false);
    const {id} =useParams()
    const authToken = localStorage.getItem('authtoken');



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
  
    const dispatch = useDispatch();
    const userProfileData = useSelector(selectUserProfile);
    useEffect(() => {
      if (authToken) {
        dispatch(userProfile());
      }
    }, [authToken, dispatch]);

  

  return (
    <>
      <Navbar />
      <div>
        <div className="card">
          <div className="card-body">
            <div className="d-flex flex-column align-items-center text-center">
              <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" alt="Admin" className="rounded-circle" width="150" />
              <div className="mt-3">  

                <h4>
                </h4>
    
                <p className="text-secondary mb-1">
                 
                <h5> {userProfileData?.username} </h5>
                <p className="text-secondary mb-1">{userProfileData?.PhotographerData?.specialty} Photographer</p>
                </p>
                {/* <p className="text-info" style={{ fontWeight: 'bold' }} >   <span>  1.5M  </span> Followers </p> */}
                <div className="mt-3">

{/*  
                  <button

                    className="btn m-1 button-animation"
                    
                    style={{
                      backgroundColor: isFollowing ? 'gray' : '#fa009e',
                      color: 'white'
                    }}
                   onClick={()=>navigate()}
                  >
                Profile

                   </button> 
                   */}


                  <button className="btn btn-outline-primary m-1 button-animation"
                    onClick={() => navigate('/chat')}
                  >
                    Message
                  </button>


                  <button
                    className="btn m-1 button-animation"
                    style={{
                      backgroundColor: 'blue',
                      color: 'white'
                    }}
                    onClick={() => navigate('/booking')}

                  >
                    Booking
                  </button>



                </div>


              </div>
            </div>
          </div>
        </div>


        <PhotographerBody />
      </div>
    </>
  );
}

export default ViewPhotographer;
