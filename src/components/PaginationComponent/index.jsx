import { Box, Container, IconButton, Typography } from "@mui/material";
import React from "react";
import FlexBetween from "../flexBetween";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { setPage } from "../../features/gallery/gallerySlice";
import { useDispatch } from "react-redux";

const Pagination = ({ next, prev, page }) => {
  const dispatch = useDispatch();

  return (
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
  );
};

export default Pagination;
