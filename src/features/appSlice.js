import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { fetchCount } from './counterAPI';

export const appSlice=createSlice({
  name:'app',
  initialState:{
    user:null,
    selectedImage:null

  },
  reducers:{
    login:(state,action)=>{
      state.user=action.payload
    },
    logout:(state)=>{
      state.user=null
    },
    selectImage:(state,action)=>{
      state.selectedImage=action.payload
    },
    resetImage:(state)=>{
      state.selectedImage=null
    }
  },
});

export const {login,logout,selectImage,resetImage} = appSlice.actions;

export const selectuser=(state)=>state.app.user;
export const selectSelectedImage=(state)=>state.app.selectedImage
export default appSlice.reducer;