import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Album = ({ album }) => {
  return (
    <Box display={"flex"} justifyContent={"center"} alignContent={"center"}>
      <Box
        sx={{
          width: "50%",
          textAlign: "center",
        }}
      >
        <Card
          sx={{
            width: "100%",
            margin: "1rem",
          }}
        >
          <CardContent>
            <Link to={`${album._id}`}>
              <Typography variant="h6" component="div">
                {album.name.toUpperCase()}
              </Typography>
            </Link>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Album;
