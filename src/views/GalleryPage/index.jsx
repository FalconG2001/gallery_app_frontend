import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  FormControl,
} from "@mui/material";
import PostCard from "./../../components/PostCard";
import { fetchGalleryPosts } from "../../features/gallery/galleryActions";
import { useDispatch, useSelector } from "react-redux";
import FlexBetween from "../../components/flexBetween";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { setPage, setSort } from "../../features/gallery/gallerySlice";

const Gallery = () => {
  const dispatch = useDispatch();
  const { page, limit, sort } = useSelector((state) => state.gallery);
  const posts = useSelector((state) => state.gallery.posts);

  const [next, setNext] = useState(false);
  const [prev, setPrev] = useState(false);

  const [filter, setFilter] = useState("");

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    dispatch(setSort({ sort: e.target.value }));
  };

  useEffect(() => {
    dispatch(fetchGalleryPosts({ page, limit, sort }));
  }, [dispatch, page, limit, sort]);

  useEffect(() => {
    if (page === 1) {
      setPrev(true);
    } else {
      setPrev(false);
    }

    if (posts?.length < limit) {
      setNext(true);
    } else {
      setNext(false);
    }
  }, [page, limit, posts]);

  return (
    <div style={{ margin: "2rem" }}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "1rem",
        }}
      >
        <FormControl
          sx={{
            width: "100px",
          }}
        >
          <InputLabel id="sort-label">Sort</InputLabel>
          <Select
            value={filter}
            onChange={handleFilterChange}
            id="sort"
            labelId="sort-label"
            label="Sort"
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="date">Date</MenuItem>
            <MenuItem value="likes">Likes</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box display={"grid"} gridTemplateColumns="repeat(12, 1fr)" gap={4}>
        {posts !== null &&
          posts.map((post) => (
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

export default Gallery;
