import React, { useState } from 'react';
import '../style/Booking.css';


import { MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../Redux/axios';




const Booking = () => {
  const [bookingDate, setBookingDate] = useState({
    booking_date: '',
  });
  const [agreed, setAgreed] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const { user_id } = useParams();

  const navigate = useNavigate();
  const authToken = localStorage.getItem('authtoken');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedDate = new Date(bookingDate);
    console.log(bookingDate , 'lllllllllllllllllllll');
    console.log(selectedDate , 'sssssssssssss');
    const currentDate = new Date();
    const validbookingdate = selectedDate > currentDate;

    if (!validbookingdate) {
      setErrorMessage('Booking date must be a future date . . !');
      return;
    }

    

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/booking/${user_id}/`,
       { booking_date:bookingDate},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(bookingDate ,'ddaaaateeeeeeeeeee');
      console.log(response, 'pppppppppp');

      if (response.status === 201) {
        setSuccessMessage( 'Booking Request Submitted Successfully ! Waiting For Photographer Confirmation ');
        setShowPopup(true);
        setTimeout(() => {
          navigate('/userprofile');
        }, 3000);
      } else {
        setSuccessMessage(null);
      }
    } catch (error) {
      console.error('Error posting booking request:', error);
      setSuccessMessage(null);
    }
  };
  
  return (
    <>

      <div>

        <div className="login-root ">
          <div className="box-root flex-flex flex-direction--column" style={{ minHeight: '100vh', flexGrow: 1 }}>
            <div className="loginbackground box-background--white padding-top--64">
              <div className="loginbackground-gridContainer">
                <div className="box-root flex-flex" style={{ gridArea: 'top / start / 8 / end' }}>
                  <div className="box-root" style={{ backgroundImage: 'linear-gradient(white 0%, rgb(247, 250, 252) 33%)', flexGrow: 1 }}></div>
                </div>
                <div className="box-root flex-flex" style={{ gridArea: '4 / 2 / auto / 5' }}>
                  <div className="box-root box-divider--light-all-2 animationLeftRight tans3s" style={{ flexGrow: 1 }}></div>
                </div>
                <div className="box-root flex-flex" style={{ gridArea: '6 / start / auto / 2' }}>
                  <div className="box-root box-background--blue800" style={{ flexGrow: 1 }}></div>
                </div>
                <div className="box-root flex-flex" style={{ gridArea: '7 / start / auto / 4' }}>
                  <div className="box-root box-background--blue animationLeftRight" style={{ flexGrow: 1 }}></div>
                </div>
                <div className="box-root flex-flex" style={{ gridArea: '8 / 4 / auto / 6' }}>
                  <div className="box-root box-background--gray100 animationLeftRight tans3s" style={{ flexGrow: 1 }}></div>
                </div>
                <div className="box-root flex-flex" style={{ gridArea: '2 / 15 / auto / end' }}>
                  <div className="box-root box-background--cyan200 animationRightLeft tans4s" style={{ flexGrow: 1 }}></div>
                </div>
                <div className="box-root flex-flex" style={{ gridArea: '3 / 14 / auto / end' }}>
                  <div className="box-root box-background--blue animationRightLeft" style={{ flexGrow: 1 }}></div>
                </div>
                <div className="box-root flex-flex" style={{ gridArea: '4 / 17 / auto / 20' }}>
                  <div className="box-root box-background--gray100 animationRightLeft tans4s" style={{ flexGrow: 1 }}></div>
                </div>
                <div className="box-root flex-flex" style={{ gridArea: '5 / 14 / auto / 17' }}>
                  <div className="box-root box-divider--light-all-2 animationRightLeft tans3s" style={{ flexGrow: 1 }}></div>
                </div>
              </div>
            </div>
            <div className="box-root padding-top--24 flex-flex flex-direction--column" style={{ flexGrow: 1, zIndex: 9 }}>
              <div className="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center">
                <h1><a href="http://blog.stackfindover.com/" rel="dofollow">Booking</a></h1>
              </div>
              <div className="formbg-outer">
                <div className="formbg">
                  <div className="formbg-inner padding-horizontal--48">
                    <span className="padding-bottom--15">Create Your  Booking </span>


                    <form id="stripe-login"   onSubmit={handleSubmit}   >
                      <div className="field padding-bottom--24">
                        <label htmlFor="email">Booking Date</label>
                        <input
                          type="datetime-local"
                          name="bookingDate"
                          value={bookingDate.booking_date} 
                          onChange={(e) => setBookingDate(e.target.value)} 
      
                          required
                        />
                      </div>
                      <div className="field padding-bottom--24">


                      </div>
                      <div className="field field-checkbox padding-bottom--24 flex-flex align-center">
                        <label htmlFor="checkbox">
                          <input
                            type="checkbox"
                            name="agreed"
                            checked={agreed}
                            onChange={() => setAgreed(!agreed)}
                            required
                          />

                          I agree to the Terms and Conditions

                        </label>
                      </div>

                      <div className="field padding-bottom--24">
                        <input type="submit" name="submit" value="Booking" />
                      </div>
                    </form>

                    {showPopup && (
        <div className="popup-container">
          <div className="popup">
            <p className="success-popup-message">{successMessage}</p>
          </div>
        </div>
      )}
       {errorMessage && <div className="error-message  ms-3 "  style={{color:'red' , }} >{errorMessage}</div>}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Booking;
