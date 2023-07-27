import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

const LoadingComponent = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <CircularProgress color="primary" size={80} />
      <Typography variant="h6" color="textPrimary" style={{ marginTop: 20 }}>
        Loading...
      </Typography>
    </Box>
  );
};

export default LoadingComponent;
