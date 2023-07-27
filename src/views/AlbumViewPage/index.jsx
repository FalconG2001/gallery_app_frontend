import React, { useEffect, useState } from "react";
import { Box, Container, IconButton, Typography } from "@mui/material";
import PostCard from "./../../components/PostCard";
import { useDispatch, useSelector } from "react-redux";
import FlexBetween from "../../components/flexBetween";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { setPage } from "../../features/gallery/gallerySlice";
import { getImagesInAlbum } from "../../features/gallery/galleryActions";
import { useParams } from "react-router-dom";

const AlbumViewPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { page, limit, addToAlbums } = useSelector((state) => state.gallery);
  const { userToken } = useSelector((state) => state.auth);

  const [likedImages, setLikesImages] = useState([]);

  const [next, setNext] = useState(false);
  const [prev, setPrev] = useState(false);

  useEffect(() => {
    dispatch(getImagesInAlbum({ userToken, id }));
  }, [dispatch, userToken, id]);

  useEffect(() => {
    if (page === 1) {
      setPrev(true);
    } else {
      setPrev(false);
    }

    if (addToAlbums?.length < limit) {
      setNext(true);
    } else {
      setNext(false);
    }

    setLikesImages(addToAlbums || []);
  }, [page, limit, addToAlbums]);

  return (
    <div style={{ margin: "2rem" }}>
      <Box display={"grid"} gridTemplateColumns="repeat(12, 1fr)" gap={4}>
        {likedImages !== null &&
          likedImages.map((post) => (
            <Box
              display={"flex"}
              justifyContent={"center"}
              gridColumn="span 3"
              key={post.id}
            >
              <PostCard imageData={post} />
            </Box>
          ))}
      </Box>
      <Container
        sx={{
          width: "20vw",
          marginTop: "1.5rem",
        }}
      >
        <FlexBetween>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignContent={"center"}
          >
            <IconButton
              onClick={() => dispatch(setPage({ action: "prev" }))}
              disabled={prev}
            >
              <NavigateBefore />
            </IconButton>
            <Typography>Prev</Typography>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignContent={"center"}
          >
            <Typography>{page}</Typography>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignContent={"center"}
          >
            <IconButton
              onClick={() => dispatch(setPage({ action: "next" }))}
              disabled={next}
            >
              <NavigateNext />
            </IconButton>
            <Typography>Next</Typography>
          </Box>
        </FlexBetween>
      </Container>
    </div>
  );
};

export default AlbumViewPage;
