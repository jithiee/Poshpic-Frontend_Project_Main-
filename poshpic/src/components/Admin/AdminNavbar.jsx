import React from 'react';
import '../Admin/Sideadmin.css';
import { useNavigate } from 'react-router-dom';



const AdminNavbar = () => {
    const navigate = useNavigate()
  return (
    <div>
      
      <div className="content text-center text-white" style={{ backgroundColor: 'black' }}>



<div className="d-flex justify-content-between align-items-center p-3">
         <li className=" me-5" style={{ color: 'yellow', listStyle: 'none' , cursor:'pointer'}} onClick={() => navigate('/home')} >VIEW SITE</li>


    {/* <div className="d-flex align-items-center">
        <input
            type="text"
            placeholder="Search..."
            className="form-control mr-2"
            style={{ width: '650px' }} // Adjust the width as needed
        />
        <i className=" ms-2 fas fa-search" style={{ fontSize: '25px' }}></i>
    </div> */}

    {/*  Icon */}
    <div>
      
    </div>

    {/* Additional content */}
    <div className="ml-auto d-flex align-items-center"   >
  
    </div>
</div><hr />

</div>
    </div>





  );
}

export default AdminNavbar;
