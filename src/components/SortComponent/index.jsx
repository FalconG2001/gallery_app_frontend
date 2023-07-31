import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const Sort = ({ filter, handleFilterChange }) => {
  return (
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
  );
};

export default Sort;
