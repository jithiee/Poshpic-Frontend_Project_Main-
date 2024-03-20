import { createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "./axios";
import { jwtDecode } from 'jwt-decode';


const authToken = localStorage.getItem('authtoken');

export const userProfile = createAsyncThunk(
  'auth/userprofile',
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      };

      const response = await axiosInstance.get('userprofile/', config);  
      // console.log('res');
      // console.log('res',response);

      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }  
);

  

export const logout = createAsyncThunk(
  'auth/logout',
  async  (_ , { rejectWithValue }) => {
    try {
      localStorage.removeItem('authtoken');
      localStorage.removeItem('userInfo');
        return {};
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);


export const userPost = createAsyncThunk(
  'auth/post',
  async (postData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('authtoken')}`,
        },
      };

      const response = await axiosInstance.post('post/', postData, config);

      return response.data;
    } catch (error) {
      console.error(error);

      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
