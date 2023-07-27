import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Container,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewAlbum,
  getAllAlbums,
} from "../../features/gallery/galleryActions";
import Album from "../../components/Album";

const AlbumPage = () => {
  const { userToken } = useSelector((state) => state.auth);
  const { albums } = useSelector((state) => state.gallery);
  const dispatch = useDispatch();

  const { control, handleSubmit, reset } = useForm();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data) => {
    dispatch(createNewAlbum({ userToken, data }));
    handleClose();
    reset();
  };

  useEffect(() => {
    dispatch(getAllAlbums({ userToken }));
  }, [dispatch, userToken]);

  return (
    <>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Container
          style={{
            textAlign: "right",
            width: "85%",
            marginTop: "1.5rem",
          }}
        >
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Create New Album
          </Button>

          <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Create New Album</DialogTitle>
            <DialogContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField {...field} label="Album Name" fullWidth />
                  )}
                />

                <DialogActions>
                  <Button color="secondary" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
                    Create
                  </Button>
                </DialogActions>
              </form>
            </DialogContent>
          </Dialog>
        </Container>
      </Box>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Box
          sx={{
            width: "85%",
            marginTop: "1.5rem",
          }}
        >
          {albums !== null &&
            albums !== undefined &&
            albums.map((album) => <Album key={album._id} album={album} />)}
        </Box>
      </Box>
    </>
  );
};

export default AlbumPage;
