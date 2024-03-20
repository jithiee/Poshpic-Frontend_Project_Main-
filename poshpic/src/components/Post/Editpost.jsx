import React, { useEffect, useState } from 'react';
import '../Photographer/Createpost.css';
import Navbar from '../Navbar';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../Redux/axios';

const Editpost = () => {
 
  const [successMessage, setSuccessMessage] = useState('');
  const [editedPostDetails, setEditedPostDetails] = useState({
    title: '',
    description: '',
    image: null,
  });

  const authToken = localStorage.getItem('authtoken');
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axiosInstance.get(`post/${postId}/`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          const { title, description } = response.data;
          setEditedPostDetails({
            title,
            description,
            image: null,
          });
        }
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    if (postId) {
      fetchPostDetails();
    }
  }, [postId, authToken]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setEditedPostDetails((prevDetails) => ({
      ...prevDetails,
      [name]: name === 'image' ? files[0] : value,
    }));
  };

  const updatePost = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', editedPostDetails.title);
      formData.append('description', editedPostDetails.description);
      formData.append('image', editedPostDetails.image);
      

      const response = await axiosInstance.patch(`post/${postId}/`, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setSuccessMessage('Post updated successfully');
        setTimeout(() => {
          setSuccessMessage('');
          navigate(`/view/${postId}`); 
        }, 2000);
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };


  return (
    <div>
       <div>
      <Navbar />

      <form
        className="your-form mt-5 mb-5"
        style={{ borderRadius: '10px', color: '#babecc' }}
        onSubmit={updatePost}
        
      
      >
        {successMessage && (
          <div
            style={{
              color: 'green',
              marginTop: '10px',
              padding: '10px',
              border: '2px solid #4CAF50',
              borderRadius: '5px',
              backgroundColor: '#f8f8f8',
              animation: 'fadeIn 1s',
            }}
          >
            {successMessage}
          </div>
        )}

        <div className="segment">

          <h1> Edit Post</h1>
        </div>
        <label className="lab">
          Title
          <input
            className="createpost-title"
            type="text"
            placeholder="Enter your title "
            name="title"
            value={editedPostDetails.title}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="">
          Description
          <textarea
            className="lab"
            name="description"
            cols="30"
            rows="5"
            placeholder="Type your description"
            style={{ border: '1px solid blue' }}
            value={editedPostDetails.description}
            onChange={handleChange}
         
          ></textarea>
        </label>
        Select image
        <label className="lab" htmlFor="">
          <input
            type="file"
            name="image"
            onChange={handleChange} 
            
          />
        </label>

        <div className="button-group">
          <button className="postbtn red" type="submit">
            Post Update
           </button>
       
          
        </div>
      </form>
    </div>
    </div>
  );
}

export default Editpost;
