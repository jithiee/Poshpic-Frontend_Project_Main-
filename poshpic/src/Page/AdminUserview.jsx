import React from 'react';
import AdminNavbar from '../components/Admin/AdminNavbar';
import Sidebaradmin from '../components/Admin/Sidebaradmin';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

const AdminUserview = () => {

        




    return (
        <div>
            <div>
                <div style={{ position: 'sticky', top: '0px' }}>

                    <AdminNavbar />
                </div>
                <div style={{ marginTop: "-18px" }}>

                    <Sidebaradmin />
                </div>
                <div style={{ display: 'flex' }} >
                    <div className="content">


                    </div >

                    <div style={{ width: '100%', marginLeft: '12%' }}>

                        <MDBTable align='middle'>
                            <MDBTableHead>
                                <tr>
                                    <th scope='col'>Name</th>
                                    <th scope='col'>First name</th>
                                    <th scope='col'>Last name</th>
                                    <th scope='col'>Phone</th>
                                    <th scope='col'>Action</th>




                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                <tr>
                                    <td>
                                        <div className='d-flex align-items-center'>
                                            <img
                                                src='https://mdbootstrap.com/img/new/avatars/7.jpg'
                                                alt=''
                                                style={{ width: '45px', height: '45px' }}
                                                className='rounded-circle'
                                            />
                                            <div className='ms-3'>
                                                <p className='fw-bold mb-1'>gia12  </p>
                                                <p className='text-muted mb-0'>gia@gmail.com</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p className='fw-normal mb-1'>gia </p>

                                    </td>
                                    <td>
                                        <p className='fw-normal mb-1'>devid </p>

                                    </td>

                                    <td>
                                        <MDBBtn color='link' rounded size='sm'>
                                            90722530877
                                        </MDBBtn>
                                    </td>
                                    <td>
                                        <MDBBadge color='danger' pill style={{ cursor: 'pointer' }}>
                                            Block
                                        </MDBBadge>

                                    </td>

                                </tr>






                            </MDBTableBody>
                        </MDBTable>

                    </div>

                </div>


            </div>

        </div>
    );
}

export default AdminUserview;
