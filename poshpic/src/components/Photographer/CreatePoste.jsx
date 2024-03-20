import React, { useRef, useState, useEffect } from 'react';
import Navbar from '../Navbar';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { userPost } from '../../Redux/authAction';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import '../Photographer/Createpost.css';
import { useNavigate } from 'react-router-dom';

const CreatePost = ({ postDetails, onCancelEdit }) => {
  const authToken = localStorage.getItem('authtoken');
  const dispatch = useDispatch();
  const [successMsg, setSuccessMsg] = useState('');

  const inputRef = useRef();
  const [editMode, setEditMode] = useState(false);

  const navigate = useNavigate();

  const [createpost, setCreatePost] = useState({
    title: '',
    description: '',
    image: null,
    video: null,
  });

  useEffect(() => {
    if (postDetails) {
      setEditMode(true);
      setCreatePost({
        title: postDetails.title,
        description: postDetails.description,
        image: null,
        video: null,
      });
    }
  }, [postDetails]);

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setCreatePost({
        ...createpost,
        image: e.target.files[0],
        video: null, // Reset video when image is selected
      });
    } else if (e.target.name === 'video') {
      setCreatePost({
        ...createpost,
        image: null, // Reset image when video is selected
        video: e.target.files[0],
      });
    } else {
      setCreatePost({
        ...createpost,
        [e.target.name]: e.target.value,
      });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', createpost.title);
      formData.append('description', createpost.description);

      if (createpost.image) {
        formData.append('image', createpost.image);
      }

      if (createpost.video) {
        formData.append('video', createpost.video);
      }

      if (editMode) {
        const response = await axios.patch(
          `http://127.0.0.1:8000/post/${postDetails.id}/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (response.status === 200) {
          setSuccessMsg('Post updated successfully');
        } else {
          console.error('Error updating post:', response.data);
        }
      } else {
        dispatch(userPost(formData));
        setSuccessMsg('Post created successfully');
        setTimeout(() => {
          navigate('/view');
        }, 1000);
      }
    } catch (error) {
      console.error('Error creating/updating post:', error);
    }
  };

  return (
    <div>
      <Navbar />

      <form
        className="your-form mt-5 mb-5"
        style={{ borderRadius: '10px', color: '#babecc' }}
        ref={inputRef}
        onSubmit={(e) => handleSubmit(e)}
      >
        {successMsg && (
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="success" onClose={() => setSuccessMsg('')}>
              {successMsg}
            </Alert>
          </Stack>
        )}

        <div className="segment">
          <h1>{editMode ? 'Edit Post' : 'Create Post'}</h1>
        </div>
        <label className="lab">
          Title
          <input
            className="createpost-title"
            type="text"
            placeholder="Enter your title "
            name="title"
            value={createpost.title}
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
            value={createpost.description}
            onChange={handleChange}
          ></textarea>
        </label>
        

        {!createpost.video && (
          
<label className="lab" htmlFor="">
  Select image
  <input type="file" name="image" onChange={handleChange} />
</label>
)}


{!createpost.image && ( // Only show if no image is selected
  <label className="lab" htmlFor="">
    Select video
    <input type="file" name="video" onChange={handleChange} />
  </label>
)}

        <div className="button-group">
          <button className="postbtn red" type="submit">
            {editMode ? 'Update Post' : 'Create Post'}
          </button>
          {editMode && (
            <button className="cancelbtn" type="button" onClick={onCancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
