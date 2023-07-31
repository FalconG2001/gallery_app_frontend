import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userSignUp, hydrateMe } from "./authActions";

const initialState = {
  mode: "light",
  loading: false,
  userInfo: null,
  userToken: null,
  error: null,
  success: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogout: (state) => {
      state.userInfo = null;
      state.userToken = null;
    },
    setLike: (state, action) => {
      if (state.userInfo.imageLikes.includes(action.payload)) {
        state.userInfo.imageLikes = state.userInfo.imageLikes.filter(
          (img) => img !== action.payload
        );
      } else {
        state.userInfo.imageLikes.push(action.payload);
      }
    },
    setUpdateImages: (state, action) => {
      state.userInfo.images.push(action.payload.data._id);
    },
    setDeleteImage: (state, action) => {
      state.userInfo.images = state.userInfo.images?.filter(
        (imgs) => imgs !== action.payload
      );
    },
    setError: (state, action) => {
      state.success = null;
      state.error = {
        status: action.payload.status,
        statusText: action.payload.statusText,
        message: action.payload.data.message,
      };
    },
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload.user;
      state.userToken = payload.token;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [hydrateMe.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [hydrateMe.fulfilled]: (state, { payload }) => {
      state.loading = false;
      console.log(payload);
      state.userInfo = payload.user;
    },
    [hydrateMe.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [userSignUp.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [userSignUp.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload.user;
      state.userToken = payload.token;
    },
    [userSignUp.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const {
  setMode,
  setLogout,
  setLike,
  setUpdateImages,
  setDeleteImage,
  setError,
  resetError,
} = authSlice.actions;
export default authSlice.reducer;
