import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../components/Admin/AdminNavbar';
import Sidebaradmin from '../components/Admin/Sidebaradmin';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

const Adminphotographer = () => {
  const [photographers, setPhotographers] = useState([]);

  useEffect(() => {
    const fetchPhotographers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/photographerlist/');
        setPhotographers(response.data);
      } catch (error) {
        console.error('Error fetching photographers:', error);
      }
    };

    fetchPhotographers();
  }, []);

  return (
    <div>
      <div style={{ position: 'sticky', top: '0px' }}>
        <AdminNavbar />
      </div>
      <div style={{ marginTop: "-18px" }}>
        <Sidebaradmin />
      </div>
      <div style={{ display: 'flex' }} >
        <div className="content"></div>
        <div style={{ width: '100%', marginLeft: '12%' }}>
          <h2 style={{ textAlign: 'center', padding: '1%', color: 'black' }}>Photographers List </h2> <hr />
          <MDBTable align='middle'>
            <MDBTableHead>
              <tr>
                <th scope='col'>Name</th>
                <th scope='col'>Specialty</th>
                <th scope='col'>Subscription</th>
                <th scope='col'>Expiry date</th>
             
        
                <th scope='col'>Action</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {photographers.map((photographer) => (
                <tr key={photographer.user_id}>
                  <td>
                    <div className='d-flex align-items-center'>
                      <img
                        src={photographer.profile_image || 'https://mdbootstrap.com/img/new/avatars/placeholder.jpg'}
                        alt=''
                        style={{ width: '45px', height: '45px' }}
                        className='rounded-circle'
                      />
                      <div className='ms-3'>
                        <p className='fw-bold mb-1'>{`${photographer.first_name} ${photographer.last_name}`}</p>
                        <p className='text-muted mb-0'>{photographer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className='fw-normal mb-1'>{photographer.specialty}</p>
                  </td>
                  <td>
                    {photographer.status ? (
                      <MDBBadge color='success' pill>
                        Active
                      </MDBBadge>
                    ) : (
                      <MDBBadge color='danger' pill>
                        No Active
                      </MDBBadge>
                    )}
                  </td>
                  <td>{photographer.expiry_date}</td>
               
                  <td>
                    <MDBBtn color='link' rounded size='sm'>
                      Block
                    </MDBBtn>
                  </td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
        </div>
      </div>
    </div>
  );
}

export default Adminphotographer;
