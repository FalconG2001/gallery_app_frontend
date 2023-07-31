export const galleryUrls = {
  getAllImagePosts: "gallery/",
  crudImageById: "gallery/:id",
  likeImage: "gallery/:id/like",
  uploadImage: "gallery/upload",
  createComment: "gallery/comments/:id",
  searchImage: "gallery/search/:name",
  favourites: "gallery/likes/images",
  getAllAlbums: "gallery/albums/all",
  createAlbum: "gallery/albums",
  addImageToAlbum: "gallery/albums/:id/images",
  getImagesInAlbum: "gallery/albums/:id",
  getAllTags: "tags",
  searchTags: "tags/:search",
};

export const baseUrl = process.env.REACT_APP_BACKEND_URL;
