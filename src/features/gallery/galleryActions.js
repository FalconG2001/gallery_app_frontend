import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { galleryUrls, baseUrl } from "../../utils/allUrls";
import { setUpdateImages } from "../auth/authSlice";

export const fetchGalleryPosts = createAsyncThunk(
  "gallery/fetchGallery",
  async ({ page, limit, sort }) => {
    try {
      let uri = `${baseUrl}${galleryUrls.getAllImagePosts}?page=${page}&limit=${limit}`;
      if (sort !== "") {
        uri = `${baseUrl}${galleryUrls.getAllImagePosts}?page=${page}&limit=${limit}&sort=${sort}`;
      }
      const res = await axios.get(uri);
      return res?.data;
    } catch (error) {
      return error;
    }
  }
);

export const deleteGalleryPost = createAsyncThunk(
  "gallery/deleteGalleryPost",
  async ({ id, userToken }) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const res = await axios.delete(
        `${baseUrl}${galleryUrls.crudImageById.replace(":id", `${id}`)}`,
        config
      );
      if (res.status === 204) return { id };
      return `${res.status}: ${res.statusText}`;
    } catch (error) {
      return error;
    }
  }
);

export const uploadGalleryImage = createAsyncThunk(
  "gallery/uploadImage",
  async ({ data, userToken, dispatch }) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };

      const res = await axios.post(
        `${baseUrl}${galleryUrls.uploadImage}`,
        { ...data },
        config
      );
      dispatch(setUpdateImages(res?.data));
      return res?.data;
    } catch (error) {
      return error;
    }
  }
);

export const likeAImage = createAsyncThunk(
  "gallery/likeImage",
  async ({ imgId, userToken }) => {
    try {
      const likeUrl = galleryUrls.likeImage.replace(":id", imgId);

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };

      const res = await axios.post(`${baseUrl}${likeUrl}`, undefined, config);

      return res?.data;
    } catch (error) {
      return error;
    }
  }
);

export const commentAImage = createAsyncThunk(
  "gallery/commentImage",
  async ({ data, imgId, userToken }) => {
    try {
      const commentUrl = galleryUrls.createComment.replace(":id", imgId);

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };

      const res = await axios.post(
        `${baseUrl}${commentUrl}`,
        { ...data },
        config
      );

      return { comment: res?.data.comment, imgId };
    } catch (error) {
      return error;
    }
  }
);

export const getImageComments = createAsyncThunk(
  "gallery/getImageComments",
  async ({ imgId }) => {
    try {
      const commentUrl = galleryUrls.createComment.replace(":id", imgId);

      const res = await axios.get(`${baseUrl}${commentUrl}`);

      return res?.data;
    } catch (error) {
      return error;
    }
  }
);

export const searchByeName = createAsyncThunk(
  "gallery/searchByName",
  async ({ name }) => {
    try {
      const url = galleryUrls.searchImage.replace(":name", name);

      const res = await axios.get(`${baseUrl}${url}`);

      return res?.data;
    } catch (error) {
      return error;
    }
  }
);

export const getFavourites = createAsyncThunk(
  "gallery/favourites",
  async ({ userToken }) => {
    try {
      const url = `${baseUrl}${galleryUrls.favourites}`;

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };

      const res = await axios.get(url, config);

      return res?.data;
    } catch (error) {
      return error;
    }
  }
);

export const getAllAlbums = createAsyncThunk(
  "gallery/getAllAlbums",
  async ({ userToken }) => {
    try {
      const uri = `${baseUrl}${galleryUrls.getAllAlbums}`;

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };

      const res = await axios.get(uri, config);

      return res?.data;
    } catch (error) {
      return error;
    }
  }
);

export const createNewAlbum = createAsyncThunk(
  "gallery/createAlbum",
  async ({ userToken, data }) => {
    try {
      const uri = `${baseUrl}${galleryUrls.createAlbum}`;

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };

      const res = await axios.post(uri, { ...data }, config);

      return res?.data;
    } catch (error) {
      return error;
    }
  }
);

export const addImageToAlbum = createAsyncThunk(
  "gallery/addImageToAlbum",
  async ({ userToken, id, data }) => {
    try {
      const uri = `${baseUrl}${galleryUrls.addImageToAlbum.replace(":id", id)}`;

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };

      const res = await axios.post(uri, { ...data }, config);

      return res?.data;
    } catch (error) {
      return error;
    }
  }
);

export const getImagesInAlbum = createAsyncThunk(
  "gallery/getImagesInAlbum",
  async ({ userToken, id }) => {
    try {
      const uri = `${baseUrl}${galleryUrls.getImagesInAlbum.replace(
        ":id",
        id
      )}`;

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };

      const res = await axios.get(uri, config);

      return res?.data;
    } catch (error) {
      return error;
    }
  }
);
