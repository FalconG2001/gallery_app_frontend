import React, { useEffect } from "react";
import styled from "styled-components";
import {
  Card,
  CardContent,
  Button,
  TextField,
  Typography,
  FormControl,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import { useForm, Controller } from "react-hook-form";
import { Email, Lock } from "@mui/icons-material";
import validator from "validator";

import bg from "./../../assets/background.jpg";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../features/auth/authActions";

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

const LoginPage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { handleSubmit, control } = useForm();

  const onSubmit = (data) => {
    if (!validator.isEmail(data.email)) {
      alert("Not a valid Email");
      return;
    }
    dispatch(userLogin(data));
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
              Login
            </Typography>
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
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
              <StyledButton variant="contained" type="submit">
                Login
              </StyledButton>
            </StyledForm>
            <Typography variant="body2">
              Don't have an account? <Link to="/signup">Sign Up</Link>
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

const CardArea = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default LoginPage;
