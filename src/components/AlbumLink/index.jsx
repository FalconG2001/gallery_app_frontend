import { Container, MenuItem, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addImageToAlbum } from "../../features/gallery/galleryActions";

const AlbumLink = ({ album, imgId }) => {
  const { userToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleAlbumClick = async () => {
    await dispatch(
      addImageToAlbum({ userToken, id: album._id, data: { images: imgId } })
    );
    alert("Added to album!");
    return;
  };

  return (
    <MenuItem onClick={handleAlbumClick}>
      <Container
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography>{album.name}</Typography>
      </Container>
    </MenuItem>
  );
};

export default AlbumLink;
