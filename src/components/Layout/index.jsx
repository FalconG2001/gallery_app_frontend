import React, { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Search,
  ArrowDropDownOutlined,
  Architecture,
  PhotoAlbumOutlined,
  LoginOutlined,
  FileUploadOutlined,
  FavoriteBorderOutlined,
  CloseOutlined,
  HomeOutlined,
} from "@mui/icons-material";
import FlexBetween from "./../flexBetween";
import profileImage from "./../../assets/background.jpg";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setMode,
  setLogout,
  resetError,
} from "./../../features/auth/authSlice";
import { Outlet, useNavigate } from "react-router-dom";
import FormPage from "../UploadForm";
import LoadingComponent from "./../LoadingComponent";
import {
  fetchGalleryPosts,
  searchByeName,
} from "../../features/gallery/galleryActions";
import { ErrorHandler } from "../HandleError";

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { postStatus, page, limit } = useSelector((state) => state.gallery);
  const { error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");

  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleSearch = (e) => {
    if (search === undefined || search === null || search === "") {
      return;
    }
    if (e.key === "Enter") {
      dispatch(searchByeName({ name: search }));
    }
  };

  const handleSearchClick = () => {
    setSearch("");
    let sort = "";
    dispatch(fetchGalleryPosts({ page, limit, sort }));
  };

  const searchChange = (e) => {
    setSearch(e.target.value);
  };

  if (error !== null) {
    setTimeout(() => {
      if (error !== null) dispatch(resetError());
    }, 5000);
  }

  return (
    <>
      <AppBar
        sx={{
          position: "static",
          background: "none",
          boxShadow: "none",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/**Left side */}
          <FlexBetween>
            <IconButton onClick={() => console.log("Menu")}>
              <Architecture />
            </IconButton>
            <FlexBetween
              backgroundColor={theme.palette.background.alt}
              borderRadius="9px"
              gap="3rem"
              p="0.1rem 1.5rem"
              marginLeft="5rem"
            >
              <InputBase
                placeholder="Search..."
                value={search}
                onChange={searchChange}
                onKeyDown={handleSearch}
              />
              <Box>
                {search.length > 0 && (
                  <IconButton onClick={handleSearchClick}>
                    <CloseOutlined />
                  </IconButton>
                )}
                <IconButton
                  onClick={(e) => {
                    e.key = "Enter";
                    handleSearch(e);
                  }}
                >
                  <Search />
                </IconButton>
              </Box>
            </FlexBetween>
          </FlexBetween>

          {/**Right side */}
          <FlexBetween gap="1.5rem">
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkModeOutlined sx={{ fontSize: "25px" }} />
              ) : (
                <LightModeOutlined sx={{ fontSize: "25px" }} />
              )}
            </IconButton>
            <IconButton onClick={() => navigate("/gallery")}>
              <HomeOutlined />
            </IconButton>
            {userInfo && (
              <>
                <IconButton onClick={() => navigate("/likes")}>
                  <FavoriteBorderOutlined sx={{ fontSize: "25px" }} />
                </IconButton>

                <IconButton onClick={() => navigate("/albums")}>
                  <PhotoAlbumOutlined sx={{ fontSize: "25px" }} />
                </IconButton>

                <IconButton onClick={() => setOpen(true)}>
                  <FileUploadOutlined sx={{ fontSize: "25px" }} />
                </IconButton>
              </>
            )}
            {userInfo === null ? (
              <IconButton onClick={() => navigate("/login")}>
                <LoginOutlined sx={{ fontSize: "25px" }} />
              </IconButton>
            ) : (
              <FlexBetween>
                <Button
                  onClick={handleClick}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    textTransform: "none",
                    gap: "1rem",
                  }}
                >
                  <Box
                    component="img"
                    alt="profile"
                    src={profileImage}
                    height="32px"
                    width="32px"
                    borderRadius="50%"
                    sx={{ objectFit: "cover" }}
                  />
                  <Box textAlign="left">
                    <Typography
                      fontWeight="bold"
                      fontSize="0.85rem"
                      sx={{ color: theme.palette.secondary[100] }}
                    >
                      {userInfo.name}
                    </Typography>
                  </Box>
                  <ArrowDropDownOutlined
                    sx={{
                      color: theme.palette.secondary[300],
                      fontSize: "25px",
                    }}
                  />
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={isOpen}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <MenuItem onClick={() => dispatch(setLogout())}>
                    Log Out
                  </MenuItem>
                </Menu>
              </FlexBetween>
            )}
          </FlexBetween>
        </Toolbar>
      </AppBar>
      <FormPage open={open} setOpen={setOpen} />
      {postStatus === "loading" ? <LoadingComponent /> : <div></div>}
      {error !== null ? <ErrorHandler err={error} /> : <div></div>}
      <Outlet />
    </>
  );
};

export default Navbar;
