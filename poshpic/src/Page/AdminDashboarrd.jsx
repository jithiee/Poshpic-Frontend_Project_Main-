import React from 'react';
import Sidebaradmin from '../components/Admin/Sidebaradmin';
import AdminNavbar from '../components/Admin/AdminNavbar';



const AdminDashboarrd = () => {
  return (
    <>
      <div style={{ position: 'sticky', top: '0px' }}>

        <AdminNavbar />
      </div>
      <div style={{ marginTop: "-18px" }}>

        <Sidebaradmin />
      </div>
      
      <div style={{ display: 'flex' }} >
        <div className="content">


        </div >

        <img  className='mt-5  mb-5' style={{ backgroundSize: 'cover', objectFit: 'cover', width: '80%', marginLeft: '16%' ,  }} src="https://themewagon.com/wp-content/uploads/2019/01/deskapp-2.jpg" alt="" />
      </div>
    </>
  );
}

export default AdminDashboarrd;
