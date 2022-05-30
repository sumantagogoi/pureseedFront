import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import axios from "axios";
import { toast } from "react-toastify";

import { useEffect } from "react";
import AuthenticationContext from "../components/context/authentication_context/AuthenticationContext";
import Logo from '../assets/Images/logo.png'


const ENDPOINT = process.env.REACT_APP_BASE_URL


const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false)

  const { userLoginDetails } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userLoginDetails) {
      navigate("/profile");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        return toast.error("Passowrd Doest Not Matched");
      } else {
        setLoading(true)
        const  response  = await axios.post(
          `${ENDPOINT}/api/users/register/`,
          {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
          },
          {
            headers: {
              "content-type": "application/json",
            },
          }
        );
        console.log(response.request.status)
        setLoading(false)
        if(response.request.status === 200){
          toast.success('Account Successfully Created');
          setFirstName('')
          setLastName('')
          setEmail('')
          setPassword('')
          setConfirmPassword('')
        }
      }
      
    } catch (error) {
      toast.error("Something Went wrong!");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          pt: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
         
        }}
      >
        <Avatar
          alt="logo"
          src={Logo}
          sx={{ width: 170, height: 170 }}
        />
        <Typography component="h1" variant="h5">
          Signup
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={firstName}
                onChange={(e) => setFirstName(e.currentTarget.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name="lastName"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                autoFocus
                value={lastName}
                onChange={(e) => setLastName(e.currentTarget.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                name="email"
                label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.currentTarget.value)}
              />
            </Grid>
          </Grid>
          <Button
            variant="outlined"
            type="submit"
            fullWidth
            sx={{
              mt: 2,
              mb: 2,
              color: "inherit",
              borderColor:'brown',
              ":hover": { bgcolor: "brown" },
            }}
          >
            Signup
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                onClick={() => navigate("/signin")}
                variant="body2"
                sx={{ color: "inherit" }}
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
          <Button
            color="inherit"
            startIcon={<GoogleIcon />}
            fullWidth
            sx={{ mt: 2, mb: 2, ":hover": { bgcolor: "red" } }}
          >
            Signup With Google
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
