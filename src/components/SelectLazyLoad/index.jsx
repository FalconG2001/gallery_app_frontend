import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  ListSubheader,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";

import useDebounce from "./../../utils/hooks/useDebounce";

import { getAllTags, searchTags } from "../../features/gallery/galleryActions";
import { setTagFilter } from "../../features/gallery/gallerySlice";
import FlexBetween from "../flexBetween";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";

const containsText = (text, searchText) =>
  text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

export default function FilterTags() {
  const dispatch = useDispatch();
  const { tags } = useSelector((state) => state.gallery);

  const [selectedOption, setSelectedOption] = useState("none");

  const [searchText, setSearchText] = useState("");
  const [prev, setPrev] = useState(false);

  const [page, setPage] = useState(1);
  const limit = useMemo(() => 10, []);

  const debouncedSearchVal = useDebounce(searchText);

  const displayedOptions = useMemo(
    () => tags.filter((tag) => containsText(tag.name, searchText)),
    [searchText, tags]
  );

  useEffect(() => {
    if (debouncedSearchVal === "") {
      dispatch(getAllTags({ page, limit }));
    } else {
      dispatch(searchTags({ search: debouncedSearchVal }));
    }
  }, [dispatch, debouncedSearchVal, page, limit]);

  useEffect(() => {
    if (page === 1) {
      setPrev(true);
    } else {
      setPrev(false);
    }
  }, [page, limit, tags]);

  useEffect(() => {
    dispatch(setTagFilter({ filter: selectedOption }));
  }, [dispatch, selectedOption]);

  return (
    <Box>
      <FormControl>
        <InputLabel id="search-select-label">Tags</InputLabel>
        <Select
          MenuProps={{ autoFocus: false }}
          labelId="search-select-label"
          id="search-select"
          value={selectedOption}
          label="Options"
          onChange={(e) => setSelectedOption(e.target.value)}
          onClose={() => setSearchText("")}
          renderValue={() => selectedOption}
        >
          <ListSubheader>
            <TextField
              size="small"
              autoFocus
              placeholder="Type to search..."
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== "Escape") {
                  e.stopPropagation();
                }
              }}
            />
          </ListSubheader>
          <MenuItem value="none">None</MenuItem>
          {displayedOptions.map((option, i) => (
            <MenuItem key={i} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
          <ListSubheader>
            <FlexBetween>
              <IconButton
                disabled={prev}
                onClick={() => setPage((prev) => prev - 1)}
              >
                <ArrowLeft />
              </IconButton>
              <IconButton
                // disabled={next}
                onClick={() => setPage((prev) => prev + 1)}
              >
                <ArrowRight />
              </IconButton>
            </FlexBetween>
          </ListSubheader>
        </Select>
      </FormControl>
    </Box>
  );
}
