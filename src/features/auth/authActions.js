import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "./../../utils/allUrls";

const configNormal = {
  headers: {
    "Content-type": "application/json",
  },
};

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${baseUrl}login`,
        { email, password },
        configNormal
      );

      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const userSignUp = createAsyncThunk(
  "auth/signup",
  async ({ name, email, password, passwordConfirm }) => {
    try {
      const { data } = await axios.post(
        `${baseUrl}signup/`,
        { name, email, password, passwordConfirm },
        configNormal
      );
      return data;
    } catch (error) {
      return error.message;
    }
  }
);

export const hydrateMe = createAsyncThunk(
  "auth/hydrate",
  async ({ userToken }) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };

      const res = await axios.get(`${baseUrl}hydrate`, config);

      return res?.data;
    } catch (error) {
      return error;
    }
  }
);
