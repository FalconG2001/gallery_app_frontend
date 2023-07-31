import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import PostCard from "./../../components/PostCard";
import { fetchGalleryPosts } from "../../features/gallery/galleryActions";
import { useDispatch, useSelector } from "react-redux";
import { setSort } from "../../features/gallery/gallerySlice";
import FilterTags from "../../components/SelectLazyLoad";
import Sort from "../../components/SortComponent";
import Pagination from "../../components/PaginationComponent";

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
        <FilterTags />
        <Sort filter={filter} handleFilterChange={handleFilterChange} />
      </Box>

      <Box display={"grid"} gridTemplateColumns="repeat(12, 1fr)" gap={4}>
        {posts !== null &&
          posts.map((post) => (
            <Box
              display={"flex"}
              justifyContent={"center"}
              gridColumn="span 3"
              key={post?.id}
            >
              <PostCard imageData={post} />
            </Box>
          ))}
      </Box>
      <Pagination page={page} prev={prev} next={next} />
    </div>
  );
};

export default Gallery;
