
import { createSlice } from '@reduxjs/toolkit';
import {  userPost, userProfile } from './authAction';





const initialState = {
  loading: false,
  error: null,
  success: false,
  userProfile:null,
  userPost :null,
}



const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      
      // userProfile

        .addCase(userProfile.pending, (state) => {
          state.loading = true;
        })
        .addCase(userProfile.fulfilled, (state, { payload }) => {
          state.loading = false;
          state.userProfile = payload;
        })
        .addCase(userProfile.rejected, (state, { payload }) => {
          state.loading= false; 
          state.error = payload;
        })


        .addCase(userPost.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(userPost.fulfilled, (state) => {
          state.status = 'succeeded';
        })
        .addCase(userPost.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        });
  





  },
  
});

export default authSlice.reducer;
export const selectUserProfile = (state) => state.user.userProfile;
export const selectUserPost= (state) => state.user.userPost;
