import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  FormControl,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { Email, Lock, Person } from "@mui/icons-material";
import bg from "./../../assets/background.jpg";
import { useDispatch, useSelector } from "react-redux";
import { userSignUp } from "./../../features/auth/authActions";
import validator from "validator";

const StyledCard = styled(Card)`
  width: 400px;
  margin: 20px auto;
  padding: 20px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
`;

const StyledButton = styled(Button)`
  && {
    background-color: "primary"
    color: white;
  }
`;

const Signup = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { handleSubmit, control } = useForm();

  const onSubmit = (data) => {
    if (!validator.isEmail(data.email)) {
      alert("Not a valid email");
      return;
    }
    dispatch(userSignUp(data));
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/gallery");
    }
  }, [navigate, userInfo]);

  return (
    <Container>
      <BackgroundArea>
        {/* Light abstract background on 60% area */}
      </BackgroundArea>
      <CardArea>
        <StyledCard>
          <CardContent>
            <Typography
              variant="h5"
              gutterBottom
              style={{ marginBottom: "20px" }}
            >
              Sign Up
            </Typography>
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Name"
                      type="text"
                      variant="outlined"
                      InputProps={{ startAdornment: <Person /> }}
                    />
                  )}
                />
              </FormControl>
              <FormControl>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      type="email"
                      variant="outlined"
                      InputProps={{ startAdornment: <Email /> }}
                    />
                  )}
                />
              </FormControl>
              <FormControl>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Password"
                      type="password"
                      variant="outlined"
                      InputProps={{ startAdornment: <Lock /> }}
                    />
                  )}
                />
              </FormControl>
              <FormControl>
                <Controller
                  name="passwordConfirm"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Confirm Password"
                      type="password"
                      variant="outlined"
                      InputProps={{ startAdornment: <Lock /> }}
                    />
                  )}
                />
              </FormControl>
              <StyledButton variant="contained" type="submit">
                Sign Up
              </StyledButton>
            </StyledForm>
            <Typography variant="body2">
              Already have an account? <Link to="/login">Login</Link>
            </Typography>
          </CardContent>
        </StyledCard>
      </CardArea>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const BackgroundArea = styled.div`
  width: 60%;
  background-color: #f3f3f3; /* Light abstract background color */
  background-image: url(${bg});
  background-size: cover;
  background-position: center;
`;

// backgroundimage: ${`url(${bg})`};

const CardArea = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Signup;
