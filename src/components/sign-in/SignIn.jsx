import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/signin-g.svg";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

// Validation schema
const SignUpchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(SignUpchema),
  });

  const signInHandler = (data) => {

    const signInUser = async () => {
      const resp = await axios.post(
        "https://api.escuelajs.co/api/v1/auth/login",
        data
      );

      if (resp?.data?.access_token) {
        localStorage.setItem("token" , resp.data.access_token)
        navigate('/')
      }
      // console.log(resp, "resp"); 
    };
  signInUser();
  };


  return (
    <Box className="container mt-5">
      <Box className="d-flex justify-content-around align-items-center flex-wrap mt-5">
        <Box>
          <img src={logo} alt="Logo" />
        </Box>
        <form onSubmit={handleSubmit((data) => signInHandler(data))}>
          <Box>
            <Typography variant="h5" className="text-start">
              Sign in to FreshCart
            </Typography>
            <Typography variant="body2">
              Welcome back to FreshCart! Enter your email to get started.
            </Typography>

            <Box>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    className="my-2"
                    fullWidth
                    label="Email"
                    placeholder="Email"
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    className="my-2"
                    fullWidth
                    label="Password"
                    placeholder="Password"
                     
                    error={!!errors.Password}
                    helperText={errors?.Password?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          onClick={() => setShowPassword(!showPassword)}
                          style={{ cursor: "pointer" }}
                        >
                          {showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
              <Box>
                <Button
                  type="submit"
                  size="small"
                  fullWidth
                  variant="contained"
                >
                  Sign In
                </Button>
              </Box>
            </Box>
            <Typography className="mt-3 text-start" variant="body2">
              Don’t have an account? <Link to="/sign-up"> Sign Up</Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default SignIn;
