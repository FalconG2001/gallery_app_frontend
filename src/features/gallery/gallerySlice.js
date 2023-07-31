import { createSlice } from "@reduxjs/toolkit";
import {
  fetchGalleryPosts,
  deleteGalleryPost,
  uploadGalleryImage,
  commentAImage,
  getImageComments,
  likeAImage,
  searchByeName,
  getFavourites,
  getAllAlbums,
  createNewAlbum,
  addImageToAlbum,
  getImagesInAlbum,
  getAllTags,
  searchTags,
} from "./galleryActions";

const initialState = {
  posts: [],
  error: "null",
  postStatus: null,
  albums: [],
  comments: [],
  favourites: [],
  addToAlbums: [],
  tags: [],
  page: 1,
  limit: 12,
  sort: "",
};

export const gallerySlice = createSlice({
  name: "galleryPosts",
  initialState,
  reducers: {
    setInitiateComments: (state) => {
      state.comments = [];
    },
    setPage: (state, action) => {
      if (action.payload.action === "next") {
        state.page += 1;
      } else if (action.payload.action === "prev") {
        if (state.page !== 1) {
          state.page -= 1;
        }
      } else {
        state.page = action.payload.page;
      }
    },
    setLimit: (state, action) => {
      state.limit = action.payload.limit;
    },
    setSort: (state, action) => {
      state.sort = action.payload.sort;
    },
    setFavourites: (state, action) => {
      state.favourites = state.favourites.filter(
        (img) => img._id !== action.payload
      );
    },
    setAddToAlbums: (state, payload) => {
      state.addToAlbums = state.addToAlbums.concat(payload.data);
    },
    initiateAddToAlbum: (state) => {
      state.addToAlbums = [];
    },
    setTagFilter: (state, action) => {
      if (action.payload.filter === "none") {
        state.sort = state.sort !== "" ? "" : "date";
      } else {
        state.posts = state.posts.filter((post) =>
          post.tags.includes(action.payload.filter)
        );
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchGalleryPosts.fulfilled, (state, action) => {
        state.postStatus = "success";
        state.posts = [];
        state.posts = state.posts.concat(action.payload.data);
      })
      .addCase(fetchGalleryPosts.rejected, (state, action) => {
        state.postStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteGalleryPost.pending, (state) => {
        state.postStatus = "loading";
      })
      .addCase(deleteGalleryPost.fulfilled, (state, action) => {
        const { id } = action.payload;
        state.postStatus = "success";
        const oldPosts = state.posts.filter((post) => post._id !== id);
        state.posts = oldPosts;
      })
      .addCase(deleteGalleryPost.rejected, (state, action) => {
        state.postStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(uploadGalleryImage.pending, (state) => {
        state.postStatus = "loading";
      })
      .addCase(uploadGalleryImage.fulfilled, (state, action) => {
        state.postStatus = "success";
        state.posts = state.posts.concat(action.payload.data);
      })
      .addCase(uploadGalleryImage.rejected, (state, action) => {
        state.postStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(commentAImage.pending, (state) => {
        state.postStatus = "loading";
      })
      .addCase(commentAImage.fulfilled, (state, action) => {
        state.postStatus = "success";
        state.posts = state.posts.map((post) => {
          if (post._id === action.payload.imgId) {
            post.comments.push(action.payload.comment._id);
          }

          return post;
        });
        state.comments = state.comments.concat(action.payload.comment);
      })
      .addCase(commentAImage.rejected, (state, action) => {
        state.postStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(likeAImage.fulfilled, (state, action) => {
        state.postStatus = "success";
        state.posts = state.posts.map((post) => {
          if (post._id === action.payload.data._id) {
            post.likes = action.payload.data.likes;
          }

          return post;
        });
      })
      .addCase(likeAImage.rejected, (state, action) => {
        state.postStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(getImageComments.pending, (state) => {
        state.postStatus = "loading";
      })
      .addCase(getImageComments.fulfilled, (state, action) => {
        state.postStatus = "success";
        state.comments = action.payload.comments;
      })
      .addCase(getImageComments.rejected, (state, action) => {
        state.postStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(searchByeName.pending, (state) => {
        state.postStatus = "loading";
      })
      .addCase(searchByeName.fulfilled, (state, action) => {
        state.postStatus = "success";
        state.posts = action.payload.search;
      })
      .addCase(searchByeName.rejected, (state, action) => {
        state.postStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(getFavourites.pending, (state) => {
        state.postStatus = "loading";
      })
      .addCase(getFavourites.fulfilled, (state, action) => {
        state.postStatus = "success";
        state.favourites = action.payload.favourites;
      })
      .addCase(getFavourites.rejected, (state, action) => {
        state.postStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(getAllAlbums.pending, (state) => {
        state.postStatus = "loading";
      })
      .addCase(getAllAlbums.fulfilled, (state, action) => {
        state.postStatus = "success";
        state.albums = action.payload.albums;
      })
      .addCase(getAllAlbums.rejected, (state, action) => {
        state.postStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(createNewAlbum.pending, (state) => {
        state.postStatus = "loading";
      })
      .addCase(createNewAlbum.fulfilled, (state, action) => {
        state.postStatus = "success";
        state.albums = state.albums.concat(action.payload.album);
      })
      .addCase(createNewAlbum.rejected, (state, action) => {
        state.postStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(addImageToAlbum.pending, (state) => {
        state.postStatus = "loading";
      })
      .addCase(addImageToAlbum.fulfilled, (state, action) => {
        state.postStatus = "success";
      })
      .addCase(addImageToAlbum.rejected, (state, action) => {
        state.postStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(getImagesInAlbum.pending, (state) => {
        state.postStatus = "loading";
      })
      .addCase(getImagesInAlbum.fulfilled, (state, action) => {
        state.postStatus = "success";
        state.addToAlbums = action.payload.albumImgs;
      })
      .addCase(getImagesInAlbum.rejected, (state, action) => {
        state.postStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(getAllTags.fulfilled, (state, action) => {
        state.postStatus = "success";
        state.tags = action.payload.data;
        state.tags = state.tags.filter((tag) => tag.images?.length > 0);
      })
      .addCase(getAllTags.rejected, (state, action) => {
        state.postStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(searchTags.fulfilled, (state, action) => {
        state.postStatus = "success";
        state.tags = action.payload.tags;
      })
      .addCase(searchTags.rejected, (state, action) => {
        state.postStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  setInitiateComments,
  setPage,
  setLimit,
  setFavourites,
  setSort,
  setTagFilter,
} = gallerySlice.actions;
export default gallerySlice.reducer;
