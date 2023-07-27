import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Container,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { uploadGalleryImage } from "../../features/gallery/galleryActions";
import { convertToBase64 } from "./../../utils/convertToBase64";

const FormPage = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const { userToken } = useSelector((state) => state.auth);
  const { control, handleSubmit, reset } = useForm();
  const [imageVal, setImageVal] = useState(null);

  const onSubmit = async (data) => {
    if (!imageVal) {
      alert("No Image Selected");
      return;
    } else {
      data = { ...data, image: imageVal };
    }

    dispatch(uploadGalleryImage({ data, userToken, dispatch }));
    setOpen(false);
    reset();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (file && file.size * 0.001 < 75) {
      const base64 = await convertToBase64(file);
      setImageVal(base64);
    } else {
      alert("File size should not exceed 75kb!");
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm">
      <DialogTitle>Create Post</DialogTitle>
      <DialogContent>
        <form>
          <Container
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Controller
              name="title"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  style={{ margin: "0.5rem" }}
                  label="Title"
                  fullWidth
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  multiline
                  rows={4}
                  fullWidth
                  style={{ margin: "0.5rem" }}
                />
              )}
            />

            <Controller
              name="image"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    style={{ background: "primary", margin: "0.5rem" }}
                    value={undefined}
                    onChange={handleImageChange}
                  />
                </>
              )}
            />

            <Controller
              name="tags"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <>
                  <TextField
                    {...field}
                    label="Tags"
                    fullWidth
                    style={{ margin: "0.5rem" }}
                  />
                </>
              )}
            />
          </Container>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormPage;
