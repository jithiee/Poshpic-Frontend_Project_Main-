import React, { useState } from 'react';
import  '../style/Userprofile.css'
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';


const Userprofile = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate()
  
  return (
      <>
      <Navbar/>
    <div>
      <Button  className='p-2 m-3' variant="primary" onClick={handleShow}>
        Click Here! your Profile
      </Button>
      <Button  className='p-2 m-3' variant="dark" onClick={()=>navigate('/home')}>
        Go Back Home
      </Button>


      <Offcanvas  className='userpro1' show={show} onHide={handleClose}>
        <Offcanvas.Header    closeButton>
          <Offcanvas.Title style={{color:'blue'}} >UserProfile</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='userpro'>
        
         
           <ul className='mt-2' style={{ color: 'white', listStyle: 'none', fontSize: '18px', fontWeight:'bolder' }}>
        <li className='userlishov p-2 ' onClick={()=>navigate('/home')}  ><i className=" fas fa-home"></i> Home</li>
      <li className='userlishov p-2 mt-3'   onClick={()=>navigate('/userprofile')}  ><i className="fas fa-user"></i> Account</li>

        <li className='userlishov p-2 mt-3' onClick={()=>navigate('/edituserprofile')}  ><i className="fas fa-pencil-alt" ></i> Edit Profile</li>
      <li className='userlishov p-2 mt-3'  onClick={()=>navigate('/follow')}  > <i className="fas fa-users"></i> Following</li>
      <li className='userlishov p-2 mt-3'><i className="fas fa-comments"></i> Chat</li>
      <li className='userlishov p-2 mt-3'><i className="fas fa-thumbs-up"></i> Liked Posts</li>



    

      <li className='userlishov p-2 mt-3 '><i className="fas fa-sign-out-alt"></i> Logout</li>
    </ul>
        </Offcanvas.Body>
      </Offcanvas>
   
    </div>
    
    
     <hr />

   

     
    </>
      
  );
}

export default Userprofile;
