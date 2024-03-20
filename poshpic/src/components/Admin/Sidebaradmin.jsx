import React from 'react';
import '../Admin/Sideadmin.css';
import { useNavigate } from 'react-router-dom';

const Sidebaradmin = () => {
    const navigate = useNavigate()
    

    return (
        <>
            <div className="sidebar">
                <div className="header" style={{ fontWeight: 'bold', fontSize: '130%' ,cursor:'pointer' }}    onClick={()=>navigate('/admin')}>   DASHBOARD </div>

                <a href="/viewphotographer"><i className="fas fa-camera"> </i> Photographers</a>
                <a href="/viewuser">
                    <i class="fas fa-users"></i> Users
                </a>
                {/* <a href="#"><i className="fas fa-calendar-alt">  </i> Bookings</a> */}
             
                <a href="#"><i className="fas fa-cog">  </i> Settings</a>
            </div>


        </>
    );
};

export default Sidebaradmin;
