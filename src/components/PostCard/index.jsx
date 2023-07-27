import React, { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  TextField,
  Button,
  Badge,
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Box,
  Menu,
  MenuItem,
  Container,
} from "@mui/material";
import {
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  ChatBubbleOutline as ChatBubbleOutlineIcon,
  DeleteOutline,
  AddAPhotoOutlined,
  Add,
  DownloadOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";

import FlexBetween from "../flexBetween";

import {
  commentAImage,
  deleteGalleryPost,
  getAllAlbums,
  getImageComments,
  likeAImage,
} from "../../features/gallery/galleryActions";
import { setDeleteImage, setLike } from "../../features/auth/authSlice";
import {
  setFavourites,
  setInitiateComments,
} from "../../features/gallery/gallerySlice";
import AlbumLink from "../AlbumLink";
import { useNavigate } from "react-router-dom";

const PostCard = ({ imageData }) => {
  const dispatch = useDispatch();
  const { userInfo, userToken } = useSelector((state) => state.auth);
  const stateComment = useSelector((state) => state.gallery.comments);
  const { albums } = useSelector((state) => state.gallery);
  const navigate = useNavigate();

  const [liked, setLiked] = useState(false);
  const [showShareButton, setShowShareButton] = useState(false);
  const [openComments, setOpenComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);

  // if (isOpen) {
  //   dispatch(getAllAlbums({ userToken }));
  // }

  /**
   *
   * Functions
   */
  const handleAlbumClick = (event) => {
    dispatch(getAllAlbums({ userToken }));
    setAnchorEl(event.currentTarget);
  };

  const handleAlbumClose = () => setAnchorEl(null);

  const handleLikeClick = async () => {
    if (!userToken) {
      alert("Please sign in to like the image!");
      return;
    }
    dispatch(likeAImage({ imgId: imageData._id, userToken }));
    dispatch(setLike(imageData._id));
    dispatch(setFavourites(imageData._id));
  };

  const handleDeleteClick = async () => {
    if (!userToken) {
      alert("Please sign in to delete!");
      return;
    }
    dispatch(deleteGalleryPost({ id: imageData._id, userToken }));
    dispatch(setDeleteImage(imageData._id));
    dispatch(setFavourites(imageData._id));
  };

  const handleCommentClick = () => {
    dispatch(getImageComments({ imgId: imageData._id }));
    setOpenComments(true);
  };

  const handleShareIconHover = (show) => () => {
    setShowShareButton(show);
  };

  const handleCommentSubmit = () => {
    if (!userToken) {
      alert("You cannot comment! Please sign in!");
      setNewComment("");
      return;
    }
    if (newComment.trim() !== "") {
      let data = { comment: newComment };
      dispatch(commentAImage({ data, userToken, imgId: imageData._id }));
      setNewComment("");
    } else {
      alert("A comment should have a string!");
    }
  };

  const handleDownload = () => {
    const a = document.createElement("a");
    a.download = `${imageData.title}`;
    a.href = imageData.image;
    a.click();
  };

  /**
   * Hooks
   */

  useEffect(() => {
    if (!openComments) {
      setNewComment("");
      dispatch(setInitiateComments());
    }
  }, [openComments, dispatch]);

  useEffect(() => {
    if (userInfo?.imageLikes?.includes(imageData._id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [userInfo, imageData]);

  useEffect(() => {
    setComments([...stateComment]);
  }, [stateComment]);

  return (
    <>
      <Card
        onMouseEnter={handleShareIconHover(true)}
        onMouseLeave={handleShareIconHover(false)}
        style={{
          height: "auto",
          width: "auto",
        }}
      >
        <CardMedia
          component="img"
          // height="300"
          image={imageData.image}
          title={imageData.title}
          alt="Post"
          sx={{ objectFit: "contain" }}
        />

        <CardContent>
          <Box
            sx={{
              marginBottom: "0.5rem",
            }}
          >
            <Typography>{imageData.title.toUpperCase()}</Typography>
          </Box>

          <FlexBetween>
            <Box>
              <IconButton
                color={liked ? "secondary" : "default"}
                onClick={handleLikeClick}
              >
                <Badge badgeContent={imageData.likes || 0} color="primary">
                  {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </Badge>
              </IconButton>

              <IconButton onClick={handleCommentClick}>
                <Badge
                  badgeContent={imageData.comments.length || 0}
                  color="primary"
                >
                  <ChatBubbleOutlineIcon />
                </Badge>
              </IconButton>

              {showShareButton && (
                <IconButton onClick={handleDownload}>
                  <DownloadOutlined />
                </IconButton>
              )}
            </Box>
            <Box>
              {showShareButton &&
                userInfo !== null &&
                userInfo.images.includes(imageData._id) && (
                  <IconButton onClick={handleDeleteClick}>
                    <DeleteOutline />
                  </IconButton>
                )}
              <IconButton onClick={handleAlbumClick}>
                <AddAPhotoOutlined />
              </IconButton>
            </Box>
          </FlexBetween>
        </CardContent>

        {/* Comment Popup */}
        <Dialog open={openComments} onClose={() => setOpenComments(false)}>
          <DialogTitle>Comments</DialogTitle>
          <DialogContent>
            {comments.map((comment) => (
              <DialogContentText key={comment._id} style={{ margin: "1rem" }}>
                <Box>
                  <Typography sx={{ fontStyle: "italic" }}>
                    {comment.username}
                  </Typography>
                  <Typography>{comment.comment}</Typography>
                </Box>
              </DialogContentText>
            ))}
            <TextField
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              label="Reply"
              variant="outlined"
              fullWidth
              multiline
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCommentSubmit}
            >
              post comment
            </Button>
          </DialogActions>
        </Dialog>

        {/* //// */}
        <Menu
          anchorEl={anchorEl}
          open={isOpen}
          onClose={handleAlbumClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <MenuItem onClick={() => navigate("/albums")}>
            <Container
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Add />
              <Typography>Create New Album</Typography>
            </Container>
          </MenuItem>
          {albums !== undefined &&
            albums !== null &&
            albums.map((album) => {
              return (
                <AlbumLink
                  key={album._id}
                  album={album}
                  imgId={imageData._id}
                />
              );
            })}
          {/* //ALbumsList */}
        </Menu>
      </Card>
    </>
  );
};

export default PostCard;
